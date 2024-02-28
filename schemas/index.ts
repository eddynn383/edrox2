import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required!"
    }),
    password: z.string().min(1, {
        message: "Password is required!"
    }),
    code: z.optional(z.string())
})

export const RegisterSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required!"
    }),
    email: z.string().email({
        message: "Email is required!"
    }),
    password: z.string().min(8, {
        message: "Minimum 8 characters are required!"
    })
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required!"
    }),
})

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum of 6 characters required",
    }),
});

export const NewInitCourseSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    url: z.string(),
    category: z.string().min(1, {
        message: "Choose a category"
    }),
    // metadata: z.record(z.string(), z.string()).optional(),
    // image: z.any().optional(),
})

export const NewCourseSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    description: z.string(),
    category: z.string().min(1, {
        message: "Choose a category"
    }),
    // metadata: z.record(z.string(), z.string()).optional(),
    // image: z.any().optional(),
})