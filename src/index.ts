/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-multi-str */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChatOpenAI, OpenAI } from '@langchain/openai'
import { webScraper } from './model/web_scraper'
import { ChatPromptTemplate, PromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'

import dotenv from 'dotenv'
import { SerpApi } from './model/serpapi'
import { type Documento } from './respository/local_document_store'
import { RunnableLambda, RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables'
dotenv.config()

// async function getLinksSaved (input: string): Promise<Documento[]> {
//   console.log('Getting links')
//   const docManager = new DocumentManager('documents.json')
//   if (docManager.getAllDocuments().length === 0) {
//     console.log('No documents found locally. Fetching from API...')
//     try {
//       const serpai = new SerpApi()
//       const searches = await serpai.searchLink(input)

//       docManager.saveFetchedData(searches)
//       console.log('Documents fetched from API and saved locally.')
//       return searches
//     } catch (error) {
//       console.error('Error fetching documents from API:', error)
//     }
//   } else {
//     console.log('Documents retrieved from local storage:')
//     return docManager.getAllDocuments()
//   }
//   return []
// }

async function getLinks (input: string): Promise<Documento[]> {
  console.log('Getting links')
  try {
    const serpai = new SerpApi()
    const searches = await serpai.searchLink(input)
    return searches
  } catch (error) {
    console.error('Error fetching documents from API:', error)
  }
  return []
}

const summary_template = PromptTemplate.fromTemplate(
  '<<< {text} >>> Using the above text, extract the minimum necessary information to answer the question: > {question} ----------- if the question cannot be answered using the text, imply summarize the text. Include all factual information, numbers, stats etc if available.'
)

const WRITER_SYSTEM_PROMPT = '1) Who you are: You are IntelliDoctor.ai, a multilingual virtual assistant meticulously designed \
                        to support medical professionals worldwide; 2) Mission: Your core mission is to provide step by \
                        step, comprehensive, detailed, evidence-based responses to a wide array of general medical \
                        queries, thereby enhancing patient care; • Your role is to ensure precision, clinical relevance,\
                        and practical applicability of the information you provide; • Your capabilities are particularly\
                        strong in presenting medication treatment options, complete with detailed dosages for each\
                        condition; 3) Audience: It is assumed that all users are medical doctors who rely on your\
                        expertise to assist them in their daily clinical practice; 4) Multilingual: IntelliDoctor.ai responds\
                        in the user&#39;s language. If the user&#39;s language is uncertain, Brazilian Portuguese will be used as\
                        the default; 5) Scientific Rigor and Uncertainty Management: • Proactive Uncertainty\
                        Identification: Recognizes uncertain areas in medicine, including limitations of studies and\
                        guideline variations; • Evidence-Based Responses: Employs evidence-based information,\
                        prioritizing clinical guidelines from recognized medical associations and peer-reviewed reliable\
                        research. This approach ensures the accuracy and clinical relevance of the information\
                        provided; • Transparency about Limitations: Clearly communicates the current limitations of\
                        knowledge; • Referral to Specialists: In doubtful cases, suggests consulting specialists or looking\
                        up recent scientific articles; • Avoiding Speculation: Bases responses on verified and current\
                        medical knowledge; • Clarity about Knowledge Limits: If unable to answer, clearly informs and\
                        advises seeking further information or specialist consultation. 6) Guidelines for Information\
                        Delivery: • Always think step by step; • You thoroughly assess each question to grasp specific\
                        details, aiming to provide information that is not only clinically relevant but also immediately\
                        applicable in medical settings. • Provide a comprehensive and detailed response to the doctors’\
                        query. • After delivering the technical information, always ask in the user’s language: &#39;Would\
                        you like additional details on any aspect discussed or do you have any other specific questions?&#39;\
                        Then include a mandatory legal disclaimer at the end, in italics and in the user’s language,\
                        stating: &#39;Disclaimer: IntelliDoctor.ai is an AI-based tool and may make errors. The information\
                        provided should be used with caution and independently verified before patient care.&#39; This\
                        disclaimer should be translated to the user&#39;s language, being the same language used in the\
                        original question.'

const RESEARCH_REPORT_TEMPLATE = 'Information: \
                        -------- \
                        {research_summary} \
                        -------- \
                        Using the above information, answer the following question or topic: "{question}" in a detailed way -- \
                        Your response should focus on the answer to the question, should be informative, \
                        in depth, with facts and numbers. \
                        If the user asks closed and narrow questions, such as `commercial names of a medicine or posology`, go straight and answer it. DO not write information that is not asked, unless the question is more open and generic such as `give me more information about a treatment of or medication`. \
                        You should strive to write the response using all relevant and necessary information provided. Your response will be delivered in a chat format, so it cannot be excessive long, \
                        but to give what the user wants with precision, confidence in a very concise way. You should gauge the size between 200 and 400 words, and this should be carefully quantified to not write excessive information especially for simple questions. \
                        Therefore, You MUST not write a conclusion of the response as it consumes space. \
                        You must write the response with markdown syntax. \
                        You MUST determine your own concrete and valid opinion based on the given information. Do NOT deter to general and meaningless conclusions. \
                        You MUST ensure that your summary includes clickable in-text citations in the format of your chosen citation style (APA, MLA, Chicago, etc.). When referencing specific information, facts, or quotes from the article, \
                        include a clickable superscript number or parentheses that link directly to the relevant section of the online source, this is essential and mandatory. YOU must at the end of the summary, provide a "References" or "Works Cited" \
                        section with the full citation details for the article, including the title, author(s), publication, date of publication and link of the source. Make sure to not add duplicated sources, but only one reference for each.  \
                        You MUST write the response in apa format. \
                        Please do your best, this is very important to my career.'

const prompt = ChatPromptTemplate.fromMessages([
  ['system', WRITER_SYSTEM_PROMPT],
  ['user', RESEARCH_REPORT_TEMPLATE]
])

async function main () {
  console.log('Langchain LCEL')

  const chain = RunnableSequence.from([
    new RunnablePassthrough().assign({
      context: () => 'conexto do lcel'
    }).withConfig({ runName: 'add context' }),
    new RunnableLambda({
      func: async (input: { question: string }) => {
        const links = await getLinks(input.question)
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
    }).withConfig({ runName: 'addLinks' }),
    new RunnableLambda({
      func: async (links: any) => {
        console.log('Scraping pages ...')
        return await Promise.all(links.map(async (link: any) => {
          const scrape = await webScraper(link.url)
          return {
            question: link.question,
            text: scrape,
            url: link.url
          }
        }))
      }
    }).withConfig({ runName: 'scrapePages' }),
    new RunnableLambda({
      func: async (scrapes: any) => {
        console.log('Summarizing pages ...')
        const summaries = await Promise.all(scrapes.map(async (scrape: any) => {
          const formattedPrompt = await summary_template.format({
            text: scrape.text,
            question: scrape.question
          })
          const llm = new OpenAI({
            modelName: 'gpt-3.5-turbo-1106',
            temperature: 0.0
          })
          const summary = await llm.invoke(
            formattedPrompt
          )
          return {
            summary,
            url: scrape.url
          }
        }))
        const flattenedObject = summaries.reduce((acc, item, index) => {
          acc[`Summary_${index + 1}`] = `Source URL: ${item.url}\nSummary: ${item.summary}`
          return acc
        }, {})
        console.log('Writing final summary ...')
        return {
          research_summary: flattenedObject,
          question: scrapes[0].question

        }
      }
    }).withConfig({ runName: 'sumarizeScrapes' }),
    prompt.pipe(new ChatOpenAI({
      temperature: 0.0
    })).pipe(new StringOutputParser())
  ])
  const startTime = new Date()
  const response = await chain.invoke({ question: 'Posology of Amoxicilin' })
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
