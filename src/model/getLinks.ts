import { DocumentManager } from '../respository/local_document_store'
import { type Documento } from './entities'
import { SerpApi } from './serpapi'

export async function getLinksSaved (input: string): Promise<Documento[]> {
  console.log('Getting links')
  const docManager = new DocumentManager('documents.json')
  if (docManager.getAllDocuments().length === 0) {
    console.log('No documents found locally. Fetching from API...')
    try {
      const serpai = new SerpApi()
      const searches = await serpai.searchLink(input)

      docManager.saveFetchedData(searches)
      console.log('Documents fetched from API and saved locally.')
      return searches
    } catch (error) {
      console.error('Error fetching documents from API:', error)
    }
  } else {
    console.log('Documents retrieved from local storage:')
    return docManager.getAllDocuments()
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
