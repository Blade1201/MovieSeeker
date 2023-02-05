import express from "express";
import createRatingValidatorMiddleware from "../middlewares/validators/rating/create.rating.validator.middleware.js";
import checkErrorsMiddleware from "../middlewares/checkErrors.middleware.js";
import verifyJWTMiddleware from "../middlewares/verifyJWT.middleware.js";
import * as ratingController from "../controllers/rating.controller.js"
import editRatingValidatorMiddleware from "../middlewares/validators/rating/edit.rating.validator.middleware.js";
import deleteRatingValidatorMiddleware from "../middlewares/validators/rating/delete.rating.validator.middleware.js";
import userRatingValidatorMiddleware from "../middlewares/validators/rating/user.rating.validator.middleware.js";

const ratingRouter = express.Router();

ratingRouter.use(express.json());

ratingRouter.use(verifyJWTMiddleware);

ratingRouter.get("/:imdbId",
    userRatingValidatorMiddleware,
    checkErrorsMiddleware,
    ratingController.get);

ratingRouter.post("/",
    createRatingValidatorMiddleware,
    checkErrorsMiddleware,
    ratingController.create,
    ratingController.getAverageScoreByMedia
);

ratingRouter.patch("/",
    editRatingValidatorMiddleware,
    checkErrorsMiddleware,
    ratingController.edit,
    ratingController.getAverageScoreByMedia);

ratingRouter.delete("/",
    deleteRatingValidatorMiddleware,
    checkErrorsMiddleware,
    ratingController.destroy,
    ratingController.getAverageScoreByMedia);

export default ratingRouter;