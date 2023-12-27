/* eslint-disable @typescript-eslint/ban-ts-comment */
import { openai } from './model/openai'
import { SerpApi } from './model/serpapi'
import { webScraper } from './model/web_scraper'

async function main () {
  const serpai = new SerpApi()
  const searches = await serpai.searchLink('amoxicillin')

  // scrape link
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  // @ts-expect-error
  const scrapes = await Promise.all(searches.map(async (item) => {
    const result = await webScraper(item.link)
    const obj = { primary_source: item.link, content: result }
    return obj
  }))

  console.log(scrapes.slice(1, 2))

  // get a summary of each scrape
  // await openai('Gostaria de informacoes sobre o medicamento: Amoxicilina', scrapes.slice(0, 4), 'medicaments')
}

void main()
