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
    role: z.enum(["LEARNER", "TUTOR"]),
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
    name: z.string().min(1, {
        message: "Name is required!"
    }),
    email: z.string().email({
        message: "Email is required!"
    }),
    bio: z.string(),
    image: z.string(),
    birthday: z.date(),
    address: z.string(),
    phone: z.string()
})

/*=================CATEGORIES======================*/

export const NewCategorySchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    })
})

export const CategorySchema = z.object({
    name: z.string().min(1, {
        message: "Name is required"
    })
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

export const CourseSettingsSchema = z.object({
    date: z.boolean(),
    repetition: z.boolean(),
    price: z.boolean(),
    seats: z.boolean(),
    tags: z.boolean()
})

export const CourseSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(100, { message: "Title is too long" }),
    description: z.string().optional(),
    category: z.string().min(1, {
        message: "Choose a category"
    }),
    subcategory: z.string().optional(),
    image: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
});

export const CourseDescriptionSchema = z.object({
    description: z.string(),
})


/*=================COVER IMAGE======================*/

export const CoverImageSchema = z.object({
    image: z.string().min(1, {
        message: "Image is required",
    }),
});


/*=================METADATA======================*/

export const CourseMetadataSchema = z.object({
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

export const ContentChapterSchema = z.object({
    content: z.string()
})

export const ChapterSchema = z.object({
    content: z.string()
})


/*=================CONTENT======================*/

export const ContentSchema = z.object({
    //     type     String
    //   value    String
    //   position Int

    value: z.string()
})



