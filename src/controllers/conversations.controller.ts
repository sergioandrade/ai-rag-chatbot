import type { FastifyReply, FastifyRequest } from 'fastify'
import { flattenError } from 'zod'
import { ragService } from '@/services/rag/rag.service'
import { conversationCompletionSchema } from './conversations.schema'

export const conversationsController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const parsed = conversationCompletionSchema.safeParse(request.body)

  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Invalid request',
      details: flattenError(parsed.error),
    })
  }

  const result = await ragService(parsed.data)

  return reply.status(200).send(result)
}
