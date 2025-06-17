import joi from 'joi';

export const bookValidationSchema = joi.object({
    title : joi.string().required().min(1),
    rating : joi.number().required().min(0).max(5)
});