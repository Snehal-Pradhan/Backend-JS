import {z} from Zod;

export const userValidationSchema = z.object({
    name : z.string().required().min(3,{message : "name must be at least 3 characters long"}),

    age : z.number().required().min(18,{msg  : "user must be 18 or older"}).integer()
})

export const validateUser = (data) => {
    return userValidationSchema.safeParse(data)
};