/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChatOpenAI } from '@langchain/openai'
import dotenv from 'dotenv'
dotenv.config()

async function main () {
  console.log('Hello World')
  const chatModel = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY
  })

  const res = await chatModel.invoke('what is LangSmith?')
  console.log(res)
}

void main()
