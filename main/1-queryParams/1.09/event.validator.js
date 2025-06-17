// validators/event.validator.js
import Joi from "joi";

export const eventValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional(),
  date: Joi.date().required(),
  tags: Joi.array().items(Joi.string()).default([])
});


export const queryValidationSchema = Joi.object({
  q: Joi.string().optional(),
  'date[gte]': Joi.date().iso().optional(),
  'tags[in]': Joi.string().optional() // comma-separated
});