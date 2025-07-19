import { z } from 'zod'

export const createUserZodSchema = z.object({
    name: z
        .string({ error: "Name must be a string" })
        .min(2, { message: "Name must be at least 2 characters long." })
        .max(50, { message: "Name cannot exceed 50 characters." }),

    email: z
        .email({
            error: "Invalid email address format.",
            pattern: z.regexes.email
        })
        .min(5, { error: "Email must be at least 5 characters long." })
        .max(100, { error: "Email cannot exceed 100 characters." }),

    password: z
        .string({ error: "Password must be a string" })
        .min(8, { message: "Password must be at least 8 characters long." })
        .regex(/^(?=.*[A-Z])/, {
            message: "Password must contain at least 1 uppercase letter.",
        })
        .regex(/^(?=.*[!@#$%^&*])/, {
            message: "Password must contain at least 1 special character.",
        })
        .regex(/^(?=.*\d)/, {
            message: "Password must contain at least 1 number.",
        }),

    phone: z
        .string({ error: "Phone Number must be a string" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message: "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
        })
        .optional(),

    address: z
        .string({ error: "Address must be a string" })
        .max(200, { message: "Address cannot exceed 200 characters." })
        .optional()
});
