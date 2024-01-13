/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChatOpenAI } from '@langchain/openai'
import { webScraper } from './model/web_scraper'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'

import dotenv from 'dotenv'
import { SerpApi } from './model/serpapi'
dotenv.config()

async function main () {
  console.log('Langchain LCEL')
  const serpai = new SerpApi()
  const searches = await serpai.searchLink('efficacy of rosuvastatin in heart attack prevention')

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

  console.log(searches.slice(0, 3))
}

void main()
