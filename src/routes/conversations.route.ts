import type { FastifyInstance } from 'fastify'
import { conversationsController } from '@/controllers/conversations.controller'

export const conversationsRoutes = async (
  app: FastifyInstance,
): Promise<void> => {
  app.post('/completions', conversationsController)
}
