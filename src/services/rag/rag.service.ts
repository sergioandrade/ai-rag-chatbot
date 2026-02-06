import { azureSearchService } from '@/services/azure-search/azure-search.service'
import { openAiService } from '@/services/open-ai/open-ai.service'
import { RolesEnum } from '@/types/roles.type'
import { buildAssistantPrompt } from './prompt.builder'
import type { ConversationCompletion } from './types'

export async function ragService(conversation: ConversationCompletion) {
  function getLastUserMessage(conversation: ConversationCompletion): string {
    const lastUserMessage = conversation.messages
      .filter((msg) => msg.role === RolesEnum.user)
      .slice(-1)
      .at(0)

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

  const sections = await azureSearchService.search({
    projectName: conversation.projectName,
    embedding,
  })

  const prompt = buildAssistantPrompt({
    question: userQuestion,
    sections,
  })

  const agentAnswer = await openAiService.createChatCompletion(prompt)

  const handoverToHumanNeeded = sections.some((section) => {
    return section.type === 'N2'
  })

  const agentMessage = {
    role: RolesEnum.agent,
    content: agentAnswer,
  }

  const messages = [...conversation.messages, agentMessage]

  return {
    messages,
    handoverToHumanNeeded,
    sectionsRetrieved: sections,
  }
}

export type { ConversationCompletion }
