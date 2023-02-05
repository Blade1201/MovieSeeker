import generalNumberValidatorMiddleware from "../generalNumber.validator.middleware.js";
import userExistValidatorMiddleware from "../userExist.validator.middleware.js";
import imdbIdValidatorMiddleware from "../imdbId.validator.middleware.js";
import valueRatingValidatorMiddleware from "./value.rating.validator.middleware.js";
import existRatingValidatorMiddleware from "./exist.rating.validator.middleware.js";
import mediaValidatorMiddleware from "../media.validator.middleware.js";

const editRatingValidatorMiddleware = [
    generalNumberValidatorMiddleware("userId")
        .custom(userExistValidatorMiddleware),
    imdbIdValidatorMiddleware()
        .custom(mediaValidatorMiddleware),
    valueRatingValidatorMiddleware()
        .custom(existRatingValidatorMiddleware)
];

export default editRatingValidatorMiddleware;