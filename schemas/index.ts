import * as z from 'zod';
import { email } from 'zod/v4';

export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),

});

export const RegisterSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    surname: z.string().min(1, { message: 'Surname is required' }),
    email: z.string().email(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});