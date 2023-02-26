import { Browser, Page } from 'puppeteer'
import puppeteer from 'puppeteer'

// describe('Puppeteer - launch a new page', () => {
//   let browser: Browser
//   let page: Page

//   beforeAll(async () => {
//     browser = await puppeteer.launch({
//       headless: false
//     })
//     page = await browser.newPage()
//   })

//   afterAll(async () => {
//     await browser.close()
//   })

//   test('should launch a browser, navigate to Google and search for "puppeteer"', async () => {
//     await page.goto('https://www.google.com', {
//       waitUntil: 'networkidle2',
//       timeout: 12000
//     })
//     await page.type('input', 'puppeteer')
//     await page.keyboard.press('Enter')
//     await page.waitForNavigation()
//     const title = await page.title()
//     console.log(title)
//     expect(title).toContain('puppeteer')
//   })
// })

describe('Puppeteer - connect to a opened browser', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    const browserURL = 'http://127.0.0.1:9222'
    browser = await puppeteer.connect({ browserURL })
    expect(browser.isConnected()).toBeTruthy()
  })

  afterAll(async () => {
    browser.disconnect()
  })

  test('should navigate to Google and search for "puppeteer"', async () => {
    const page = (await browser.pages())[0]
    await page.goto('https://www.google.com')
    await page.type('input', 'puppeteer')
    await page.keyboard.press('Enter')
    await page.waitForNavigation()
    const title = await page.title()
    expect(title).toContain('puppeteer')
  })
})
