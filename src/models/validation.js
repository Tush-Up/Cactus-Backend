const Joi = require("@hapi/joi");

const RegisterValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required(),
    password: Joi.string()
      .min(8)
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    repeatPassword: Joi.ref("password"),
    email: Joi.string().min(6).required().email(),
    phone: Joi.string().min(11).max(13).required(),
    bankName: Joi.string().min(3).required(),
    accountNumber: Joi.string().min(9).max(15).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
  });
  return schema.validate(data);
};

module.exports.RegisterValidation = RegisterValidation;
module.exports.loginValidation = loginValidation;
