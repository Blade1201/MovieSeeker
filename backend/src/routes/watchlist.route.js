import express from "express"
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware.js";
import {body} from "express-validator";
import userExistValidatorMiddleware from "../middlewares/validators/userExist.validator.middleware.js";
import checkErrorsMiddleware from "../middlewares/checkErrors.middleware.js";
import * as watchlistController from "../controllers/watchlist.controller.js";
import watchlistValidatorMiddleware
    from "../middlewares/validators/watchlist.validator.middleware.js";
import subscriptionExistValidatorMiddleware from "../middlewares/validators/subscriptionExist.validator.middleware.js";
const watchlistRouter = express.Router();

watchlistRouter.use(express.json());
watchlistRouter.use(verifyJWTMiddleware);
watchlistRouter.use(
    body("userId").custom(userExistValidatorMiddleware).custom(subscriptionExistValidatorMiddleware));

watchlistRouter.get("/",
    checkErrorsMiddleware,
    watchlistController.get);

watchlistRouter.post("/",
    watchlistValidatorMiddleware,
    checkErrorsMiddleware,
    watchlistController.create);

watchlistRouter.patch("/",
    watchlistValidatorMiddleware,
    checkErrorsMiddleware,
    watchlistController.edit);

export default watchlistRouter;