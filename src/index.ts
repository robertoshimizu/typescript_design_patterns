import { SerpApi } from './model/serpapi'
import { webScraper } from './model/web_scraper'

async function main () {
  const serpai = new SerpApi()
  const link = await serpai.searchLink('amoxicillin')
  console.log(link)

  // scrape link
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  const response = await webScraper(link)
  console.log(response)
}

void main()
