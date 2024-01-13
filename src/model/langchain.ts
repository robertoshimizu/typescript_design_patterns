import { config } from 'dotenv'
import { SearchApiLoader } from 'langchain/document_loaders/web/searchapi'
import { TokenTextSplitter } from 'langchain/text_splitter'

export async function langchain () {
  config()
  const apiKey = process.env.SERPAPI_API_KEY || '' // Ensure apiKey is always defined
  // Define your question and query

  const query = 'Your question here'

  // Use SearchApiLoader to load web search results
  const loader = new SearchApiLoader({ q: query, apiKey, engine: 'google' })
  const docs = await loader.load()

  const textSplitter = new TokenTextSplitter({
    chunkSize: 800,
    chunkOverlap: 100
  })
  const splitDocs = await textSplitter.splitDocuments(docs)
  console.log(splitDocs)
}
