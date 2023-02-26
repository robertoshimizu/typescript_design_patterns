import { Browser, Page } from 'puppeteer'
import puppeteer from 'puppeteer'

describe('Puppeteer', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false
    })
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
  })

  it('should navigate to Google and search for "puppeteer"', async () => {
    await page.goto('https://www.google.com', {
      waitUntil: 'networkidle2',
      timeout: 12000
    })
    await page.type('input', 'puppeteer')
    await page.keyboard.press('Enter')
    await page.waitForNavigation()
    const title = await page.title()
    console.log(title)
    expect(title).toContain('puppeteer')
  })
})
