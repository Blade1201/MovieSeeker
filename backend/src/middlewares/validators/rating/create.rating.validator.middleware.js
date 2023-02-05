import generalNumberValidatorMiddleware from "../generalNumber.validator.middleware.js";
import userExistValidatorMiddleware from "../userExist.validator.middleware.js";
import imdbIdValidatorMiddleware from "../imdbId.validator.middleware.js";
import notExistRatingValidatorMiddleware from "./notExist.rating.validator.middleware.js";
import valueRatingValidatorMiddleware from "./value.rating.validator.middleware.js";
import mediaValidatorMiddleware from "../media.validator.middleware.js";

const createRatingValidatorMiddleware = [
    generalNumberValidatorMiddleware("userId")
        .custom(userExistValidatorMiddleware),
    imdbIdValidatorMiddleware()
        .custom(mediaValidatorMiddleware),
    valueRatingValidatorMiddleware()
        .custom(notExistRatingValidatorMiddleware)
];

export default createRatingValidatorMiddleware;