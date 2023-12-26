import { config } from 'dotenv'
import { getJson } from 'serpapi'

// Load environment variables from .env file
config()

async function main () {
  try {
    const SERPAPI_API_KEY = process.env.SERPAPI_API_KEY // Load API key from environment variable
    if (SERPAPI_API_KEY == null) {
      throw new Error('API_KEY is not set in the environment variables.')
    }

    const response = await getJson({
      engine: 'google',
      api_key: SERPAPI_API_KEY,
      q: 'coffee',
      location: 'Austin, Texas'
    })

    console.log(response)
  } catch (error) {
    console.error('Error:', error)
  }
}

void main()
