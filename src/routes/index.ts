import { ROUTES } from '@/constants/routes.constant'
import type { FastifyInstance } from 'fastify'

export default async function routes(app: FastifyInstance): Promise<void> {
  ROUTES.forEach(({ path, handler }) => {
    app.register(handler, { path })
  })
}
