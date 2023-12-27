import { SerpApi } from './model/serpapi'
import { webScraper } from './model/web_scraper'

async function main () {
  const serpai = new SerpApi()
  const searches = await serpai.searchLink('amoxicillin')

  // scrape link
  // @ts-expect-error
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  const scrapes = await Promise.all(searches.map(async (item) => {
    const result = await webScraper(item.link)
    return result
  }))
  console.log(scrapes)
}

void main()
