import { z } from 'zod'

export const conversationCompletionSchema = z.object({
  helpdeskId: z.number(),
  projectName: z.string(),
  messages: z.array(
    z.object({
      role: z.enum(['USER', 'AGENT']),
      content: z.string().min(1),
    }),
  ),
})
