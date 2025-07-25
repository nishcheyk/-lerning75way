import express from "express";
import * as userController from "./user.controller";
import * as userValidation from "./user.validation";

const router = express.Router();

router.post("/register", userValidation.createUser, userController.register);
router.post("/login", userValidation.login, userController.login);
router.post("/logout", userController.logout); 
export default router;
