import Joi from 'joi';

export default {
  recipeId: Joi.object().keys({
    id: Joi.number().required(),
  }),
  profile: Joi.object().keys({
    name: Joi.string().optional().min(1).max(200),
    profilePicUrl: Joi.string().optional().uri(),
  }),
};