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

        return objs.map((obj) => {
          const newInput = {
            question: input.question,
            context: 'questao traduzida para portugues',
            url: obj.pageContent.link
          }
          return newInput
        })
      }
    }).withConfig({ runName: 'addLinks' })
    // new RunnableLambda({
    //   func: async (links: any) => {
    //     console.log('Scraping pages ...')
    //     return await Promise.all(links.map(async (link: any) => {
    //       const scrape = await webScraper(link.url)
    //       return {
    //         question: link.question,
    //         text: scrape,
    //         url: link.url
    //       }
    //     }))
    //   }
    // }).withConfig({ runName: 'scrapePages' }),
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
  console.log(response)

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
