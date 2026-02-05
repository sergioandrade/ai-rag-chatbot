import { openAiService } from '@/services/open-ai/open-ai.service'
import { RolesEnum } from '@/types/roles.type'
import type { ConversationCompletion } from './types'

export async function ragService(conversation: ConversationCompletion) {
  function getLastUserMessage(conversation: ConversationCompletion): string {
    const lastUserMessage = conversation.messages
      .filter((msg) => msg.role === RolesEnum.user)
      .slice(-1)[0]

    if (!lastUserMessage) {
      throw new Error(`No ${RolesEnum.user} message found in conversation`)
    }

    return lastUserMessage.content
  }

  const userQuestion = getLastUserMessage(conversation)
  const embedding = await openAiService.createEmbedding(userQuestion)

  if (embedding.length === 0) {
    throw new Error('Embedding generation failed')
  }

  return {
    embedding,
  }
}

export type { ConversationCompletion }
