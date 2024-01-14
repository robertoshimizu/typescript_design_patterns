/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChatOpenAI } from '@langchain/openai'
import { webScraper } from './model/web_scraper'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'

import dotenv from 'dotenv'
import { SerpApi } from './model/serpapi'
import { DocumentManager, type Documento } from './respository/local_document_store'
import { RunnableLambda, RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables'
dotenv.config()

async function getLinks (input: string): Promise<Documento[]> {
  console.log('Getting links')
  const docManager = new DocumentManager('documents.json')
  if (docManager.getAllDocuments().length === 0) {
    console.log('No documents found locally. Fetching from API...')
    try {
      const serpai = new SerpApi()
      const searches = await serpai.searchLink(input)

      docManager.saveFetchedData(searches)
      console.log('Documents fetched from API and saved locally.')
      return searches
    } catch (error) {
      console.error('Error fetching documents from API:', error)
    }
  } else {
    console.log('Documents retrieved from local storage:')
    return docManager.getAllDocuments()
  }
  return []
}

async function main () {
  console.log('Langchain LCEL')

  // console.log(searches?.slice(0, 3))
  // scrape link
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  // @ts-expect-error
  // const scrapes = await Promise.all(searches.map(async (item) => {
  //   const result = await webScraper(item.link)
  //   const obj = { primary_source: item.link, content: result }
  //   return obj
  // }))

  // console.log(scrapes.slice(1, 2))

  // const prompt = ChatPromptTemplate.fromMessages([
  //   ['system', 'You are a personal assistant.'],
  //   ['user', '{input}']
  // ])
  // const chatModel = new ChatOpenAI({
  //   openAIApiKey: process.env.OPENAI_API_KEY
  // })

  // const chain = prompt.pipe(chatModel).pipe(new StringOutputParser()).pipe(search)
  // const input = {
  //   input: 'efficacy of rosuvastatin in heart attack prevention'
  // }
  // const res = await chain.invoke(input)
  // console.log(res)

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', 'You are a personal assistant.'],
    ['user', 'This is my question: {question}']
  ])

  const chain = RunnableSequence.from([
    new RunnablePassthrough().assign({
      context: () => 'conexto do lcel'
    }).withConfig({ runName: 'add context' }),
    new RunnableLambda({
      func: async (input: string) => {
        console.log('input', input.question)
        const links = await getLinks(input.question)
        const obj: Documento = links[0]

        const newInput = {
          question: 'Qual a eficacia do rosuvastatina na prevencao de ataque cardiaco?',
          context: 'questao traduzida para portugues',
          url: obj.pageContent.link
        }
        console.log('newInput', newInput)
        return newInput
      }
    }).withConfig({ runName: 'contextRetriever' }),
    prompt
  ])

  const res = await chain.invoke({ question: 'What is the efficacy of rosuvastatin in heart attack prevention?' })
  console.log(res)
}

void main()
