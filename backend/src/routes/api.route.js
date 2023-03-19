import express from "express";
import {param} from "express-validator";
import * as apiController from "../controllers/api.controller.js";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware.js";
import {body} from "express-validator";
import userExistValidatorMiddleware from "../middlewares/validators/userExist.validator.middleware.js";
import subscriptionExistValidatorMiddleware
    from "../middlewares/validators/subscription/subscriptionExist.validator.middleware.js";
import checkErrorsMiddleware from "../middlewares/checkErrors.middleware.js";

const apiRouter = express.Router();

apiRouter.use(express.json());

apiRouter.get("/", apiController.search);

apiRouter.get("/popular/:type",
    verifyJWTMiddleware,
    body("userId")
        .custom(userExistValidatorMiddleware)
        .custom(subscriptionExistValidatorMiddleware),
    param("type").isIn(["movie", "tv"]).bail().withMessage("Érvénytelen típus!"),
    checkErrorsMiddleware,
    apiController.popular);

apiRouter.get("/upcoming",
    verifyJWTMiddleware,
    body("userId")
        .custom(userExistValidatorMiddleware),
    checkErrorsMiddleware,
    apiController.upcoming);

export default apiRouter;