import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import ScalarApiReference from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: false,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'AI RAG Chatbot API',
      description: 'API Documentation',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(ScalarApiReference, {
  routePrefix: '/api-docs',
  configuration: {
    theme: 'bluePlanet',
  },
})

app.get('/test', async () => {
  return {
    status: 'Docker is working!',
    timestamp: new Date().toISOString(),
  }
})

const start = async () => {
  try {
    await app.listen({ port: 3333, host: '0.0.0.0' })
    console.log('😎 Server running on http://localhost:3333')
    console.log('📄 Docs running on http://localhost:3333/api-docs')
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
