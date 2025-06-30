import {z} from "zod";

export const envValidationSchema = z.object({
    PORT : z.coerce().number().default(3000),
    MONGO_URI : z.string().url().refine((url)=> url.startsWith("mongodb")),
    NODE_ENV : z.enum(["development","production"]).default("development")
})


