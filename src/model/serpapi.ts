import dotenv from 'dotenv'
import { SerpAPILoader } from 'langchain/document_loaders/web/serpapi'
import { type Documento } from '../respository/local_document_store'

interface SerpApiPayload {
  engine: string
  api_key: string
  q: string
  location: string
  tbs: string
}

// interface OrganicResult {
//   position: number
//   title: string
//   link: string
//   displayed_link: string
//   favicon: string
//   snippet: string
//   snippet_highlighted_words: string[]
//   source: string
// }

// Load environment variables from .env file
dotenv.config()
export class SerpApi {
  private readonly api_key: string
  constructor () {
    const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY // Load API key from environment variable
    if (SERPAPI_API_KEY == null) {
      throw new Error('SERPAPI_API_KEY is not set in the environment variables.')
    }
    this.api_key = SERPAPI_API_KEY
  }

  async searchLink (query: string): Promise<Documento[]> {
    const source = 'site:scielo.br/ OR site:ncbi.nlm.nih.gov/pmc/ OR site:cochranelibrary.com/ OR site:drugs.com/ OR site:medscape.com/ OR site:ncbi.nlm.nih.gov/books/ OR site:merckmanuals.com/professional/ OR site:nice.org.uk/guidance/ OR site:who.int/publications/ OR site:cdc.gov'
    const payload: SerpApiPayload = {
      engine: 'google',
      api_key: this.api_key,
      q: `(${query}) ${source}`,
      location: 'Austin, Texas',
      tbs: 'cdr:1,cd_min:01/01/2018'
    }
    try {
      const loader = new SerpAPILoader(payload)
      const docs = await loader.load()
      const allDocs = docs.map(doc => ({
        ...doc,
        metadata: {
          source: '',
          responseType: '',
          ...doc.metadata
        }
      }))
      if (allDocs.length === 0) {
        throw new Error('No documents found.')
      }
      if (allDocs.length < 3) {
        return allDocs
      }
      return allDocs.slice(0, 3)
    } catch (error) {
      console.log('Error retrieving SerpAPILoader:', error)
      return []
    }
  }
}
