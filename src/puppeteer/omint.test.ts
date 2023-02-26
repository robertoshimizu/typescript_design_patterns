import { Browser, ElementHandle, Page } from 'puppeteer'
import puppeteer from 'puppeteer'

describe('Omint - connect to a opened browser', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    const browserURL = 'http://127.0.0.1:9222'
    browser = await puppeteer.connect({ browserURL, defaultViewport: null })
    expect(browser.isConnected()).toBeTruthy()
  })

  afterAll(async () => {
    browser.disconnect()
  })

  test('page url should be Omint', async () => {
    page = (await browser.pages())[0]
    expect(page.url()).toContain('omintseguros.com.br')
  })
  test('switch tab between info pessoal and cotacao', async () => {
    page = (await browser.pages())[0]
    try {
      const info_tab = await page.waitForXPath('//a[@id="BTN_118000728"]')
    } catch (error) {}
  })
})
