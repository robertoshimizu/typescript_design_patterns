import { config } from 'dotenv'
import { getJson } from 'serpapi'

interface SerpApiPayload {
  engine: string
  api_key: string
  q: string
  location: string
  tbs: string
}

interface OrganicResult {
  position: number
  title: string
  link: string
  displayed_link: string
  favicon: string
  snippet: string
  snippet_highlighted_words: string[]
  source: string
}

// Load environment variables from .env file
config()
export class SerpApi {
  private readonly api_key: string
  constructor () {
    const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY // Load API key from environment variable
    if (SERPAPI_API_KEY == null) {
      throw new Error('SERPAPI_API_KEY is not set in the environment variables.')
    }
    this.api_key = SERPAPI_API_KEY
  }

  async searchLink (query: string) {
    const source = 'site:scielo.br/ OR site:ncbi.nlm.nih.gov/pmc/ OR site:cochranelibrary.com/ OR site:drugs.com/ OR site:medscape.com/ OR site:ncbi.nlm.nih.gov/books/ OR site:merckmanuals.com/professional/ OR site:nice.org.uk/guidance/ OR site:who.int/publications/ OR site:cdc.gov'
    const payload: SerpApiPayload = {
      engine: 'google',
      api_key: this.api_key,
      q: `(${query}) ${source}`,
      location: 'Austin, Texas',
      tbs: 'cdr:1,cd_min:01/01/2018'
    }
    try {
      const responses = await getJson(payload)
      const organicResults: OrganicResult[] = responses.organic_results
      return organicResults
    } catch (error) {
      console.error('Error:', error)
    }
  }
}
