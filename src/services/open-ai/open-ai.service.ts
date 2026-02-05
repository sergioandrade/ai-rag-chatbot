import type { OpenAiEmbeddingResponse } from './types'

const OPENAI_BASE_URL = 'https://api.openai.com/v1'

async function createEmbedding(input: string): Promise<number[]> {
  if (!input || input.trim().length === 0) {
    throw new Error('Input text is required to create embeddings')
  }

  const response = await fetch(`${OPENAI_BASE_URL}/embeddings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-3-large',
      input,
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to create embedding')
  }

  const data = (await response.json()) as OpenAiEmbeddingResponse

  if (!data || !data.data || data.data.length === 0) {
    throw new Error('No embedding returned from OpenAI')
  }

  return data.data.at(0)?.embedding || []
}

export const openAiService = {
  createEmbedding,
}
