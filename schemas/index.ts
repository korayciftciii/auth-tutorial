import { UserRole } from '@prisma/client';
import * as z from 'zod';

export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    email: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.USER, UserRole.VENDOR]),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6))
}).refine((data) => {
    if (data.newPassword && !data.password) {
        return false;
    }
    return true;
}, {
    message: "password is required!",
    path: ["password"]
})
    .refine((data) => {
        if (data.password && !data.newPassword) {
            return false;
        }
        return true;
    }, {
        message: "New password is required!",
        path: ["newPassword"]
    })

export const ResetSchema = z.object({
    email: z.string().email(),

});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),

});


export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    code: z.optional(z.string()),

});

export const RegisterSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    surname: z.string().min(1, { message: 'Surname is required' }),
    email: z.string().email(),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
});