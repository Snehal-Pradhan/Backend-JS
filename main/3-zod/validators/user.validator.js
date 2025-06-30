import {z} from "zod"

export const userValidationSchema = z.object({
    name : z.string().minLength(0).maxLength(25).required().trim(),
    email: z.string().unique().required().email().trim(),
    role : z.string().enum(["user", "admin"]).default("user")
})

