import type {
  ChatMessage,
  OpenAiChatCompletionResponse,
  OpenAiEmbeddingResponse,
} from './types'

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

async function createChatCompletion(messages: ChatMessage[]): Promise<string> {
  if (!messages || messages.length === 0) {
    throw new Error('Messages are required to create a chat completion')
  }

  const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages,
      temperature: 0.2,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenAI chat completion error: ${error}`)
  }

  const data = (await response.json()) as OpenAiChatCompletionResponse

  const content = data?.choices?.at(0)?.message?.content

  if (!content || typeof content !== 'string') {
    throw new Error('OpenAI chat completion returned empty content')
  }

  return content
}

export const openAiService = {
  createEmbedding,
  createChatCompletion,
}
