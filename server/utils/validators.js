import Joi from 'joi';

export const registerSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  username: Joi.string()
    .min(3)
    .max(20)
    .required(),
  password: Joi.string()
    .alphanum()
    .min(8)
    .required()
});

export const postSchema = Joi.object().keys({
  title: Joi.string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z]$/)
    .required(),
  author: Joi.string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z]$/)
    .required(),
  genre: Joi.string()
    .min(3)
    .max(20)
    .required(),
  description: Joi.string()
    .min(3)
    .max(300)
    .required()
  });

export const postUpdateSchema = Joi.object().keys({
  title: Joi.string()
    .min(3)
    .max(20),
  author: Joi.string()
    .min(3)
    .max(20),
  genre: Joi.string()
    .min(3)
    .max(20),
  description: Joi.string()
    .min(3)
    .max(300)
});

export const commentSchema = Joi.object().keys({
  comment: Joi.string()
    .max(500)
    .required()
});
