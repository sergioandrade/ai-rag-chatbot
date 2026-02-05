import type z from 'zod'
import type { conversationCompletionSchema } from '@/controllers/conversations.schema'

export type ConversationCompletion = z.infer<
  typeof conversationCompletionSchema
>
