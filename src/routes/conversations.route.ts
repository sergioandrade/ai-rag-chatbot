import type { FastifyInstance } from 'fastify'
import { conversationsController } from '@/controllers/conversations.controller'

export async function conversationsRoutes(app: FastifyInstance): Promise<void> {
  app.get('/conversations', async () => ({
    conversations: [],
  }))

  app.post('/conversations', async (request, reply) => {
    reply.status(201)
    return { id: 'conv_1' }
  })

  app.post('/completions', conversationsController)
}
