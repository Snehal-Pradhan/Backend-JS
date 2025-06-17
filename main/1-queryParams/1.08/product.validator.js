import joi from 'joi';

export const productValidationSchema = joi.object({
  name: joi.string().min(3).max(50).required(),
  price: joi.number().min(0).required(),
  description: joi.string().max(500).optional() 
});

export const queryValidationSchema = joi.object({
  q : joi.string().min(1).max(50).optional(),
  page: joi.number().integer().min(1).default(1),
  limit: joi.number().integer().min(1).max(100).default(10)  
})