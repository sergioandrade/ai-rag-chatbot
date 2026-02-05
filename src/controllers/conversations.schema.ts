import { z } from 'zod'
import { RolesEnum } from '@/types/roles.type'

export const conversationCompletionSchema = z.object({
  helpdeskId: z.number(),
  projectName: z.string(),
  messages: z.array(
    z.object({
      role: z.enum(RolesEnum),
      content: z.string().min(1),
    }),
  ),
})
