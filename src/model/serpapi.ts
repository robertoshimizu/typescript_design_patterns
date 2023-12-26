import { config } from 'dotenv'
import { getJson } from 'serpapi'

interface SerpApiPayload {
  engine: string
  api_key: string
  q: string
  location: string
  tbs: string
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

  async search (query: string) {
    const source = 'site:ncbi.nlm.nih.gov/books/ OR site:ncbi.nlm.nih.gov/pmc/'
    const payload: SerpApiPayload = {
      engine: 'google',
      api_key: this.api_key,
      q: `${query} ${source}`,
      location: 'Austin, Texas',
      tbs: 'cdr:1,cd_min:01/01/2018'
    }
    try {
      const response = await getJson(payload)

      return response.organic_results[0]
    } catch (error) {
      console.error('Error:', error)
    }
  }
}
