/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as fs from 'fs'
import * as path from 'path'
import { type Metadata, type Documento, type PageContent } from '../model/entities'

export class DocumentManager {
  private documents: Documento[]
  private readonly filename: string

  constructor (filename: string) {
    // Hardcoded path relative to the project root
    const dbPath = 'src/db'
    // Check if the path contains 'dist' directory
    this.filename = path.join(__dirname, '..', '..', dbPath, filename)

    console.log('DocumentManager filename:', this.filename)
    this.documents = []
    this.loadData()
  }

  private loadData (): void {
    try {
      const fileData = fs.readFileSync(this.filename, 'utf8')
      const rawData = JSON.parse(fileData)

      // Deserialize data for each query
      this.documents = Object.entries(rawData).reduce((acc, [query, documents]) => {
        acc[query] = documents.map(doc => ({
          pageContent: JSON.parse(doc.pageContent) as PageContent,
          metadata: doc.metadata as Metadata
        }))
        return acc
      }, {})
    } catch (error) {
      this.documents = {}
    }
  }

  private saveData (): void {
    const dataToSave = Object.entries(this.documents).reduce((acc, [query, documents]) => {
      acc[query] = documents.map(doc => ({
        pageContent: JSON.stringify(doc.pageContent),
        metadata: doc.metadata
      }))
      return acc
    }, {})
    // console.log('Data to save', dataToSave)
    fs.writeFileSync(this.filename, JSON.stringify(dataToSave, null, 2), 'utf8')
  }

  public create (document: Documento): void {
    this.documents.push(document)
    this.saveData()
  }

  public update (index: number, newDocument: Documento): boolean {
    if (this.documents[index]) {
      this.documents[index] = newDocument
      this.saveData()
      return true
    }
    return false
  }

  public delete (index: number): boolean {
    if (this.documents[index]) {
      this.documents.splice(index, 1)
      this.saveData()
      return true
    }
    return false
  }

  public getAllDocuments (): Documento[] {
    return this.documents
  }

  public saveFetchedData (apiData: Documento[]): void {
    this.documents = apiData
    this.saveData()
  }

  public getDocumentsForQuery (query: string): Documento[] {
    return this.documents[query] || []
  }

  public saveDocumentsForQuery (query: string, documents: Documento[]): void {
    this.documents[query] = documents
    this.saveData()
  }
}
