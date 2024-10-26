const joi = require("joi");

const userSignUp = joi.object({
  name: joi.string().min(4).max(50).required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: joi
    .string()
    .pattern(
      new RegExp(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$#!%*?&.]{8,40}/
      ),
      {
        name: "At least one uppercase, one lowercase, one special character, and minimum of 8 and maximum of 40 characters",
      }
    )
    .required(),
  role: joi.string().valid("user", "admin").required(),
});

const userSignIn = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: joi
    .string()
    .pattern(
      new RegExp(
        /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!#.])[A-Za-z\d$@$#!%*?&.]{8,40}/
      ),
      {
        name: "At least one uppercase, one lowercase, one special character, and minimum of 8 and maximum of 40 characters",
      }
    )
    .required(),
});
//validate user signup and login data
exports.validateUserSignup = (data) => {
  const { err, value } = userSignUp.validateAsync(data);
  return { err: err, value };
};

exports.validateUserLogin = (data) => {
  const { err, value } = userSignIn.validateAsync(data);
  return { err: err, value };
};
