import type { ChatMessage } from '../rag/types'

export type OpenAiEmbeddingVector = number[]

export type OpenAiEmbeddingItem = {
  object: 'embedding'
  index: number
  embedding: OpenAiEmbeddingVector
}

export type OpenAiEmbeddingUsage = {
  prompt_tokens: number
  total_tokens: number
}

export type OpenAiEmbeddingResponse = {
  object: 'list'
  data: OpenAiEmbeddingItem[]
  model: string
  usage: OpenAiEmbeddingUsage
}

export type OpenAiChatChoice = {
  message: ChatMessage
}

export type OpenAiChatCompletionResponse = {
  choices: OpenAiChatChoice[]
}
