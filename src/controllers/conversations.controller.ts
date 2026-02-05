import type { FastifyReply, FastifyRequest } from 'fastify'
import { flattenError } from 'zod'
import { conversationCompletionSchema } from './conversations.schema'

async function conversationsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parsed = conversationCompletionSchema.safeParse(request.body)

  if (!parsed.success) {
    return reply.status(400).send({
      error: 'Invalid request',
      details: flattenError(parsed.error),
    })
  }

  //const result = await ragService.execute(parsed.data)
  const result = { message: 'ok' }
  return reply.status(200).send(result)
}

export { conversationsController }
