import { config } from 'dotenv'
import { getJson } from 'serpapi'

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
    try {
      const response = await getJson({
        engine: 'google',
        api_key: this.api_key,
        q: query,
        location: 'Austin, Texas'
      })

      return response
    } catch (error) {
      console.error('Error:', error)
    }
  }
}
