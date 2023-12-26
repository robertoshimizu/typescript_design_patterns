import { SerpApi } from './model/serpapi'

async function main () {
  const serpai = new SerpApi()
  const response = await serpai.search('amoxicillin')
  console.log(response)
}

void main()
