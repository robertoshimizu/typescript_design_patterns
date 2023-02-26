import { Browser, ElementHandle, Page } from 'puppeteer'
import puppeteer from 'puppeteer'

describe('Omint - connect to a opened browser', () => {
  let browser: Browser
  let page: Page
  let element: ElementHandle<any>

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
      // seleccao COTACAO
      element = await page.waitForXPath('//a[@id="BTN_118000728"]')
      await element.click()
      element = await page.waitForXPath('//button[@id="BTN_118000550"]')
      expect(element).toBeTruthy()
    } catch (error) {}
    try {
      // seleccao INFO PESSOAL
      element = await page.waitForXPath('//a[@id="BTN_118000715"]')
      await element.click()
      element = await page.waitForXPath('//button[@id="BTN_118000730"]')
      expect(element).toBeTruthy()
    } catch (error) {}
  })
})
