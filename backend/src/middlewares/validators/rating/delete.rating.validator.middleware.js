import generalNumberValidatorMiddleware from "../generalNumber.validator.middleware.js";
import userExistValidatorMiddleware from "../userExist.validator.middleware.js";
import imdbIdValidatorMiddleware from "../imdbId.validator.middleware.js";
import existRatingValidatorMiddleware from "./exist.rating.validator.middleware.js";
import mediaValidatorMiddleware from "../media.validator.middleware.js";

const deleteRatingValidatorMiddleware = [
    generalNumberValidatorMiddleware("userId")
        .custom(userExistValidatorMiddleware),
    imdbIdValidatorMiddleware()
        .custom(mediaValidatorMiddleware)
        .custom(existRatingValidatorMiddleware)
]

export default deleteRatingValidatorMiddleware;