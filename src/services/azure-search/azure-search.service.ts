import type {
  AzureSearchRequest,
  AzureSearchResponse,
  AzureSearchResult,
  SearchInput,
} from './types'

const AZURE_SEARCH_ENDPOINT = process.env.AZURE_SEARCH_ENDPOINT as string
const AZURE_SEARCH_INDEX = process.env.AZURE_SEARCH_INDEX as string
const AZURE_SEARCH_API_VERSION = process.env.AZURE_SEARCH_API_VERSION as string
const AZURE_AI_SEARCH_KEY = process.env.AZURE_AI_SEARCH_KEY as string
const AZURE_SEARCH_LIMIT = 3

async function search(input: SearchInput): Promise<AzureSearchResult[]> {
  const { projectName, embedding } = input

  if (!projectName) {
    throw new Error('projectName is required')
  }

  if (!embedding || embedding.length === 0) {
    throw new Error('embedding is required')
  }

  const body: AzureSearchRequest = {
    count: true,
    select: 'content, type',
    top: 10,
    filter: `projectName eq '${projectName}'`,
    vectorQueries: [
      {
        vector: embedding,
        k: AZURE_SEARCH_LIMIT,
        fields: 'embeddings',
        kind: 'vector',
      },
    ],
  }

  const response = await fetch(
    `${AZURE_SEARCH_ENDPOINT}/indexes/${AZURE_SEARCH_INDEX}/docs/search?api-version=${AZURE_SEARCH_API_VERSION}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_AI_SEARCH_KEY,
      },
      body: JSON.stringify(body),
    },
  )

  if (!response.ok) {
    throw new Error('Failed to search Azure AI Search')
  }

  const data = (await response.json()) as AzureSearchResponse

  if (!data.value || data.value.length === 0) {
    return []
  }

  return data.value.map((doc) => ({
    content: doc.content,
    type: doc.type,
    score: doc['@search.score'],
  }))
}

export const azureSearchService = {
  search,
}
