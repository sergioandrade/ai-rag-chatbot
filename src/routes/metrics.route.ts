import type { FastifyInstance } from 'fastify'

export const metricsRoutes = async (app: FastifyInstance) => {
  app.get('/metrics', () => ({
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  }))
}
