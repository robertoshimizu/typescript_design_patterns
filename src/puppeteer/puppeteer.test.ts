import { Browser, Page } from 'puppeteer'
import puppeteer from 'puppeteer'

describe('Puppeteer', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
  })

  afterAll(async () => {
    await browser.close()
  })

  it('should navigate to Google and search for "puppeteer"', async () => {
    await page.goto('https://www.google.com')
    await page.type('input[name="q"]', 'puppeteer')
    await page.keyboard.press('Enter')
    await page.waitForNavigation()
    const title = await page.title()
    expect(title).toContain('puppeteer')
  })
})
