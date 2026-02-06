import { conversationsRoutes } from '@/routes/conversations.route'
import { healthRoutes } from '@/routes/health.route'
import { metricsRoutes } from '@/routes/metrics.route'

export const ROUTES = [
  { path: '/health', handler: healthRoutes },
  { path: '/metrics', handler: metricsRoutes },
  { path: '/conversations', handler: conversationsRoutes },
]

export const HTTP_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
}
