import express from "express";

import registrationValidatorMiddleware from "../middlewares/validators/registration.validator.middleware.js";
import loginValidatorMiddleware from "../middlewares/validators/login.validator.middleware.js";
import checkErrorsMiddleware from "../middlewares/checkErrors.middleware.js";
import registrationAuthorizationMiddleware from "../middlewares/authorization/registration.authorization.middleware.js";
import loginAuthorizationMiddleware from "../middlewares/authorization/login.authorization.middleware.js";
import authenticationHandlerMiddleware from "../middlewares/authenticationHandler.middleware.js";

const authorizationRouter = express.Router();

authorizationRouter.use(express.json());

authorizationRouter.post("/register",
    registrationValidatorMiddleware,
    checkErrorsMiddleware,
    registrationAuthorizationMiddleware,
    authenticationHandlerMiddleware);



authorizationRouter.post("/login",
    loginValidatorMiddleware,
    checkErrorsMiddleware,
    loginAuthorizationMiddleware,
    authenticationHandlerMiddleware
    );

export default authorizationRouter;