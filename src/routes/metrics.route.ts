import type { FastifyInstance } from 'fastify'

export async function metricsRoutes(app: FastifyInstance): Promise<void> {
  app.get('/metrics', async () => ({
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  }))
}
