import type { BuildAssistantPromptInput, ChatMessage } from './types'

const PROMPT_CONTENT = `You are a customer support assistant.
You must answer ONLY using the information provided in the context below.
Do NOT use any external knowledge.
If the context does not contain enough information to answer, say that you do not have enough information.`

export function buildAssistantPrompt(
  input: BuildAssistantPromptInput,
): ChatMessage[] {
  const { question, sections } = input

  const context = sections
    .map((section, index) => `${index + 1}. ${section.content}`)
    .join('\n')

  const systemMessage: ChatMessage = {
    role: 'system',
    content: PROMPT_CONTENT.trim(),
  }

  const content = `Context: ${context} User question: ${question}`

  const userMessage: ChatMessage = {
    role: 'user',
    content,
  }

  return [systemMessage, userMessage]
}
