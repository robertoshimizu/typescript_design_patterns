import { Browser, ElementHandle, Page } from 'puppeteer'
import puppeteer from 'puppeteer'

// Open a terminal and run the following command:
// chrome --remote-debugging-port=9222

// it should open a new browser with a message like this
// DevTools listening on ws://127.0.0.1:9222/devtools/browser/65b9a7c4-dbfb-483c-aafd-c7ecbf68e244

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
  // test('switch tab between info pessoal and cotacao', async () => {
  //   page = (await browser.pages())[0]
  //   try {
  //     // seleccao COTACAO
  //     element = await page.waitForXPath('//a[@id="BTN_118000728"]')
  //     await element.click()
  //     element = await page.waitForXPath('//button[@id="BTN_118000550"]')
  //     expect(element).toBeTruthy()
  //   } catch (error) {}
  //   try {
  //     // seleccao INFO PESSOAL
  //     element = await page.waitForXPath('//a[@id="BTN_118000715"]')
  //     await element.click()
  //     element = await page.waitForXPath('//button[@id="BTN_118000730"]')
  //     expect(element).toBeTruthy()
  //   } catch (error) {}
  // })
  test('select and change birthdate', async () => {
    page = (await browser.pages())[0]

    // selecionar data de nascimento
    const birthdate: ElementHandle<any> = await page.waitForXPath(
      '//input[@id="dt_nasc"]'
    )
    expect(birthdate.).toBeTruthy()
    await birthdate.type('12051990')
  })
})
