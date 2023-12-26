import { SerpApi } from './model/serpapi'

async function main () {
  const serpai = new SerpApi()
  const response = await serpai.search('beer')

  console.log(response)
}

// eslint-disable-next-line no-void
void main()
