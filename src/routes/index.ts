import type { FastifyInstance } from 'fastify'
import { ROUTES } from '@/constants/routes.constant'

export default async function routes(app: FastifyInstance): Promise<void> {
  ROUTES.forEach(({ path, handler }) => {
    app.register(handler, { path })
  })
}
