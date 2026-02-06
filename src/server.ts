import { fastify } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { registerCors } from './plugins/cors.plugin'
import { registerSwagger } from './plugins/swagger.plugin'
import { registerZod } from './plugins/zod.plugin'
import routes from './routes'

const SERVER_PORT = process.env.SERVER_PORT

async function bootstrap(): Promise<void> {
  const app = fastify().withTypeProvider<ZodTypeProvider>()

  registerZod(app)
  registerCors(app)
  registerSwagger(app)
  await app.register(routes)

  const port = SERVER_PORT ? parseInt(SERVER_PORT) : 3333
  const host = process.env.HOST || '0.0.0.0'

  try {
    await app.listen({ port, host })
    console.log(`🚀 Server running at http://${host}:${port}`)
    console.log(`📄 API Docs at http://${host}:${port}/api-docs`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

bootstrap()
