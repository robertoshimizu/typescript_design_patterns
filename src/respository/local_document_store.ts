/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as fs from 'fs'
import * as path from 'path'

export interface Document {
  pageContent: string // since pageContent is a JSON string
  metadata: Metadata
}

export interface Metadata {
  source: string
  responseType: string
}

export class DocumentManager {
  private documents: Document[]
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
      this.documents = JSON.parse(fileData) as Document[]
    } catch (error) {
      // Handle file read error (e.g., file not found)
      this.documents = []
    }
  }

  private saveData (): void {
    fs.writeFileSync(this.filename, JSON.stringify(this.documents, null, 2), 'utf8')
  }

  public create (document: Document): void {
    this.documents.push(document)
    this.saveData()
  }

  public update (index: number, newDocument: Document): boolean {
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

  public getAllDocuments (): Document[] {
    return this.documents
  }

  public saveFetchedData (apiData: Document[]): void {
    this.documents = apiData
    this.saveData()
  }
}
