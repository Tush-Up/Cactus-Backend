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
    phone: Joi.string().min(8).max(13).required(),
    bankName: Joi.string().min(3).required(),
    accountNumber: Joi.string().min(9).max(15).required(),
    salary: Joi.number().min(30000)
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

const editProfileValidation = (data) => {
  const schema = Joi.object({
    phone: Joi.string().min(8).max(13).required(),
    bankName: Joi.string().min(3).required(),
    accountNumber: Joi.string().min(9).max(15).required(),
    salary: Joi.number().min(30000)
  })
  return schema.validate(data)
}

const claimFormValidation = (data) => {
  const schema = Joi.object({
    previousPosition: Joi.string().min(6).required(),
    companyName: Joi.string().min(6).required(),
    companyEmail: Joi.string().min(6).max(25).required(),
    incidentDate: Joi.string().min(6).required(),
    incidentDescription: Joi.string().min(6).required(),
    witnessName: Joi.string().min(6).required(),
    witnessPhone: Joi.number().min(6).required(),
    witnessEmail: Joi.string().min(6).required()
  })
  return schema.validate(data)
}

module.exports.RegisterValidation = RegisterValidation;
module.exports.loginValidation = loginValidation;
module.exports.editProfileValidation = editProfileValidation;
module.exports.claimFormValidation = claimFormValidation;