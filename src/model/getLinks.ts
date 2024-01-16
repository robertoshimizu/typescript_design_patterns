import { DocumentManager } from '../respository/local_document_store'
import { type Documento } from './entities'
import { SerpApi } from './serpapi'

export async function getLinksSaved (input: string): Promise<Documento[]> {
  console.log('Getting links')
  const docManager = new DocumentManager('documents.json')
  const existingDocuments = docManager.getDocumentsForQuery(input)

  if (existingDocuments.length === 0) {
    console.log('No documents found locally for this query. Fetching from API...')
    try {
      const serpai = new SerpApi()
      const searches = await serpai.searchLink(input)

      docManager.saveDocumentsForQuery(input, searches)
      console.log('Documents fetched from API and saved locally for:', input)
      return searches
    } catch (error) {
      console.error('Error fetching documents from API:', error)
    }
  } else {
    console.log('Documents retrieved from local storage for:', input)
    return existingDocuments
  }
  return []
}

export async function getLinks (input: string): Promise<Documento[]> {
  console.log('Getting links')
  try {
    const serpai = new SerpApi()
    const searches = await serpai.searchLink(input)
    return searches
  } catch (error) {
    console.error('Error fetching documents from API:', error)
  }
  return []
}
