export type AzureSearchVectorQuery = {
  vector: number[]
  k: number
  fields: string
  kind: 'vector'
}

export type AzureSearchRequest = {
  count: boolean
  select: string
  top: number
  filter: string
  vectorQueries: AzureSearchVectorQuery[]
}

export type AzureSearchDocument = {
  content: string
  type: 'N1' | 'N2'
  '@search.score': number
}

export type AzureSearchResponse = {
  value: AzureSearchDocument[]
}

export type SearchInput = {
  projectName: string
  embedding: number[]
}
