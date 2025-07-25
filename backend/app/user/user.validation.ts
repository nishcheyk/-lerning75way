// user.validation.ts
import { body } from "express-validator";
import { checkExact } from "express-validator";

export const login = checkExact([
  body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Email must be valid"),
  body("password").notEmpty().withMessage("Password is required").isString().withMessage("Password must be a string"),
]);

export const createUser = checkExact([
  body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Email must be valid"),
  body("password").notEmpty().withMessage("Password is required").isString().withMessage("Password must be a string"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
]);
