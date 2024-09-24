import Joi from "joi";

export const postSchema = Joi.object({
    text: Joi.string().min(3).max(300).required().messages({
        "string.base": "'text' must be a string.",
        "string.min": "'text' have to be at least 3 characters long.",
        "string.max": "'text' can be at most 300 characters long",
        "any.required": "'text' is required. Why are you trying to post an empty message?",
    }),
    username: Joi.string()
        .pattern(/^[a-zA-Z0-9åäöÅÄÖ]+$/)
        .min(3)
        .max(20)
        .required()
        .messages({
            "string.base": "'username' must be a string.",
            "string.pattern.base": "'username' can only contain letters and numbers",
            "string.min": "'username' must be be at least 3 characters long.",
            "string.max": "'username' must be at most 20 characters long",
            "any.required": "'username' is required. You gotta be someone after all.",
        }),
})
    .unknown(false)
    .messages({
        "object.unknown": "Unknown properties are not allowed.",
    });

export const updateSchema = Joi.object({
    sk: Joi.date().iso().required().messages({
        "date.base": "'sk' must be a valid date.",
        "date.iso": "'sk' must be a valid iso 8601 string.",
        "any.required": "'sk' is required.",
    }),
    text: Joi.string().min(3).max(300).required().messages({
        "string.base": "'text' must be a string.",
        "string.min": "'text' have to be at least 3 characters long.",
        "string.max": "'text' can be at most 300 characters long.",
        "any.required": "'text' is required. Why are you trying to post an empty message?",
    }),
})
    .unknown(false)
    .messages({
        "object.unknown": "Unknown properties are not allowed.",
    });

export const skSchema = Joi.object({
    sk: Joi.date().iso().required().messages({
        "date.base": "'sk' must be a valid date.",
        "date.iso": "'sk' must be a valid iso 8601 string.",
        "any.required": "'sk' is required.",
    }),
})
    .unknown(false)
    .messages({
        "object.unknown": "Unknown properties are not allowed.",
    });

export const usernameSchema = Joi.object({
    username: Joi.string()
        .pattern(/^[a-zA-Z0-9åäöÅÄÖ]+$/)
        .min(3)
        .max(20)
        .required()
        .messages({
            "string.base": "'username' must be a string.",
            "string.pattern.base": "'username' can only contain letters and numbers",
            "string.min": "'username' must be be at least 3 characters long.",
            "string.max": "'username' must be at most 20 characters long",
            "any.required": "'username' is required. You gotta be someone after all.",
        }),
})
    .unknown(false)
    .messages({
        "object.unknown": "Unknown properties are not allowed.",
    });
