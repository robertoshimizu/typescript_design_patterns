/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as fs from 'fs'
import * as path from 'path'

export interface PageContent {
  position: number
  title: string
  link: string
  redirect_link: string
  displayed_link: string
  favicon: string
  author?: string
  cited_by?: string
  extracted_cited_by?: number
  date?: string
  snippet?: string
  snippet_highlighted_words?: string[]
  sitelinks?: { inline: any[] } // Adjust the type according to your data
  source?: string
}

export interface Documento {
  pageContent: PageContent
  metadata: Metadata
}

export interface Metadata {
  source: string
  responseType: string
}

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
      const rawData = JSON.parse(fileData) as Array<{ pageContent: string, metadata: Metadata }>
      this.documents = rawData.map(data => ({
        pageContent: JSON.parse(data.pageContent) as PageContent,
        metadata: data.metadata
      }))
    } catch (error) {
      // Handle file read error (e.g., file not found)
      this.documents = []
    }
  }

  private saveData (): void {
    const dataToSave = this.documents.map(doc => ({
      pageContent: JSON.stringify(doc.pageContent),
      metadata: doc.metadata
    }))
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
}
