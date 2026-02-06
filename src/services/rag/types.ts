import type z from 'zod'
import type { conversationCompletionSchema } from '@/controllers/conversations.schema'
import type { AzureSearchDocument } from '../azure-search/types'

export type ConversationCompletion = z.infer<
  typeof conversationCompletionSchema
>

export type BuildAssistantPromptInput = {
  question: string
  sections: AzureSearchDocument[]
}

export type ChatMessage = {
  role: 'system' | 'user'
  content: string
}
