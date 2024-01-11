import cheerio from 'cheerio'

export async function webScraper(page: string) {
    try {
        const response = await fetch(page)
        const htmlContent = await response.text()

        const $ = cheerio.load(htmlContent)

        // Remove script, style tags, and comments
        $('script, style').remove()
        $('*')
            .contents()
            .each(function () {
                if (this.nodeType === 8) {
                    // Node type 8 corresponds to comments
                    $(this).remove()
                }
            })

        // Extracting text and removing extra whitespace
        let textContent = $('body').text()
        textContent = textContent.replace(/\s\s+/g, ' ').trim()

        return textContent
    } catch (error: any) {
        console.error('Error fetching the page:', error.message)
    }
}
