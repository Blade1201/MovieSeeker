import express from "express";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware.js";
import addSubscriptionValidatorMiddleware
    from "../middlewares/validators/subscription/add.subscription.validator.middleware.js";
import checkErrorsMiddleware from "../middlewares/checkErrors.middleware.js";
import * as subscriptionController from "../controllers/subscription.controller.js"
import userExistValidatorMiddleware from "../middlewares/validators/userExist.validator.middleware.js";
import {body} from "express-validator";

const subscriptionRouter = express.Router();
subscriptionRouter.use(express.json());
subscriptionRouter.use(verifyJWTMiddleware);

subscriptionRouter.get("/",
    verifyJWTMiddleware,
    body("userId").custom(userExistValidatorMiddleware),
    checkErrorsMiddleware,
    subscriptionController.userHasAccess);

subscriptionRouter.post("/",
    addSubscriptionValidatorMiddleware,
    checkErrorsMiddleware,
    subscriptionController.add
);

export default subscriptionRouter;