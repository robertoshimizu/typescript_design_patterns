/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-multi-str */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChatOpenAI, OpenAI } from '@langchain/openai'
import { webScraper } from './model/web_scraper'
import { StringOutputParser } from '@langchain/core/output_parsers'

import dotenv from 'dotenv'

import { RunnableLambda, RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables'
import { type Documento } from './model/entities'
import { getLinks, getLinksSaved } from './model/getLinks'
import { summaryTemplate, prompt } from './model/prompts'
dotenv.config()

interface QuestionItem {
  question: string
  context: string
  url: string
}

function extractCodeFromUrl (url: string): { type: string, code: string } | null {
  const patterns = {
    statsPearl: /https:\/\/www\.ncbi\.nlm\.nih\.gov\/books\/(NBK\d+)/,
    pmc: /https:\/\/www\.ncbi\.nlm\.nih\.gov\/pmc\/articles\/(PMC\d+)/,
    medscape: /emedicine\.medscape\.com\//,
    drugs: /www\.drugs\.com\//
  }

  for (const type in patterns) {
    const match = url.match(patterns[type as keyof typeof patterns])
    if (match != null) {
      return { type, code: match[1] }
    }
  }

  return null
}

function separateQuestions (questions: QuestionItem[]): [{ statsPearl: QuestionItem[] }, { pmc: QuestionItem[] }, { others: QuestionItem[] }] {
  const categorized = {
    statsPearl: [] as QuestionItem[],
    pmc: [] as QuestionItem[],
    medscape: [] as QuestionItem[],
    drugs: [] as QuestionItem[],
    others: []
  }

  questions.forEach(question => {
    const result = extractCodeFromUrl(question.url)
    if (result != null) {
      categorized[result.type as keyof typeof categorized].push(question)
    } else {
      categorized.others.push(question)
    }
  })

  return [{ statsPearl: categorized.statsPearl }, { pmc: categorized.pmc }, { medscape: categorized.medscape }, { drugs: categorized.drugs }, { others: categorized.others }]
}

async function processLinks (items: QuestionItem[]): Promise<any[]> {
  // Map over each category to process its links in parallel

  const processedItems = await Promise.all(items.map(async (item: QuestionItem) => {
    // Determine the category name (e.g., 'statsPearl', 'pmc', etc.)

    const categoryInfo = extractCodeFromUrl(item.url)
    const category = (categoryInfo != null) ? categoryInfo.type : 'others'

    // Process each link in the category in parallel
    const scrapeData = await webScraper(category, item.url)
    return {
      question: item.question,
      context: item.context,
      text: scrapeData,
      url: item.url
    }
  }))

  return processedItems
}

// async (links: any) => {
//   console.log('Scraping pages ...')
//   return await Promise.all(links.map(async (link: any) => {
//     const scrape = await webScraper(link.url)
//     return {
//       question: link.question,
//       text: scrape,
//       url: link.url
//     }
//   }))
// }

async function main () {
  console.log('Langchain LCEL')

  const chain = RunnableSequence.from([
    new RunnablePassthrough().assign({
      context: () => 'conexto do lcel'
    }).withConfig({ runName: 'add context' }),
    new RunnableLambda({
      func: async (input: { question: string }) => {
        const links = await getLinksSaved(input.question)
        const objs: Documento[] = links

        const response = objs.map((obj) => {
          const newInput = {
            question: input.question,
            context: 'questao traduzida para portugues',
            url: obj.pageContent.link
          }
          return newInput
        })

        // console.log(JSON.stringify(response, null, 2)
        return response
      }
    }).withConfig({ runName: 'addLinks' }),
    new RunnableLambda({
      func: processLinks
    }).withConfig({ runName: 'scrapePages' })
    // new RunnableLambda({
    //   func: async (scrapes: any) => {
    //     console.log('Summarizing pages ...')
    //     const summaries = await Promise.all(scrapes.map(async (scrape: any) => {
    //       const formattedPrompt = await summaryTemplate.format({
    //         text: scrape.text,
    //         question: scrape.question
    //       })
    //       const llm = new OpenAI({
    //         modelName: 'gpt-3.5-turbo-1106',
    //         temperature: 0.0
    //       })
    //       const summary = await llm.invoke(
    //         formattedPrompt
    //       )
    //       return {
    //         summary,
    //         url: scrape.url
    //       }
    //     }))
    //     const flattenedObject = summaries.reduce((acc, item, index) => {
    //       acc[`Summary_${index + 1}`] = `Source URL: ${item.url}\nSummary: ${item.summary}`
    //       return acc
    //     }, {})
    //     console.log('Writing final summary ...')
    //     return {
    //       research_summary: flattenedObject,
    //       question: scrapes[0].question

    //     }
    //   }
    // }).withConfig({ runName: 'sumarizeScrapes' }),
    // prompt.pipe(new ChatOpenAI({
    //   temperature: 0.0
    // })).pipe(new StringOutputParser())
  ])
  const startTime = new Date()
  const response = await chain.invoke({ question: 'Lupus nephritis' })
  console.log('Final Chain', response)

  // const stream = await chain.stream({ question: 'Bupropion adverse effects' })

  // for await (const chunk of stream) {
  //   console.log(chunk)
  // }

  const endTime = new Date()
  const timeElapsed = Number(endTime) - Number(startTime) // Time in milliseconds
  console.log('done')
  console.log(`Time elapsed: ${timeElapsed} ms`)
}

void main()
