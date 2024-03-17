import * as z from "zod"

/*=================USERS======================*/

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

export const ProfileSchema = z.object({
    name: z.string().email({
        message: "Name is required!"
    }),
    bio: z.string(),
    image: z.string(),
    birthday: z.date()
})


/*=================COURSES======================*/

export const NewCourseSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    // url: z.string(),
    category: z.string().min(1, {
        message: "Choose a category"
    })
})

export const NewCourseDetailsSchema = z.object({
    description: z.string(),
    price: z.number(),
    discountPrice: z.number()
})


/*=================METADATA======================*/

export const MetadataSchema = z.object({
    key: z.string().min(1),
    value: z.string(),
});


/*=================CHAPTERS======================*/

export const NewChapterSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
    description: z.string()
})



