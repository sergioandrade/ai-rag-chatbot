import type { FastifyReply, FastifyRequest } from 'fastify'
import { flattenError } from 'zod'
import { HTTP_CODES } from '@/constants/routes.constant'
import { ragService } from '@/services/rag/rag.service'
import { conversationCompletionSchema } from './conversations.schema'

export const conversationsController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const parsed = conversationCompletionSchema.safeParse(request.body)

  if (!parsed.success) {
    return reply.status(HTTP_CODES.BAD_REQUEST).send({
      error: 'Invalid request',
      details: flattenError(parsed.error),
    })
  }

  const result = await ragService(parsed.data)

  return reply.status(HTTP_CODES.OK).send(result)
}
