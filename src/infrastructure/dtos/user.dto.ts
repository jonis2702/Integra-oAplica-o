import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2),
  lastName: z.string().min(2),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  registration: z.string().min(5),
  password: z.string().min(6),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;