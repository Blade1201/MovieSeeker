import express from "express";
import createFavoriteValidatorMiddleware
    from "../middlewares/validators/favorite/create.favorite.validator.middleware.js";
import checkErrorsMiddleware from "../middlewares/checkErrors.middleware.js";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware.js";
import * as favoriteController from "../controllers/favorite.controller.js";
import deleteFavoriteValidatorMiddleware
    from "../middlewares/validators/favorite/delete.favorite.validator.middleware.js";
import generalNumberValidatorMiddleware from "../middlewares/validators/generalNumber.validator.middleware.js";
import userExistValidatorMiddleware from "../middlewares/validators/userExist.validator.middleware.js";

const favoriteRouter = express.Router();

export default favoriteRouter;

favoriteRouter.use(express.json());

favoriteRouter.use(verifyJWTMiddleware);

favoriteRouter.get("/",
    generalNumberValidatorMiddleware("userId")
        .custom(userExistValidatorMiddleware),
    favoriteController.getList
)

favoriteRouter.post("/",
    createFavoriteValidatorMiddleware,
    checkErrorsMiddleware,
    favoriteController.create
    );

favoriteRouter.delete("/",
    deleteFavoriteValidatorMiddleware,
    checkErrorsMiddleware,
    favoriteController.destroy
    );