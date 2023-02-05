import generalNumberValidatorMiddleware from "../generalNumber.validator.middleware.js";
import userExistValidatorMiddleware from "../userExist.validator.middleware.js";
import imdbIdValidatorMiddleware from "../imdbId.validator.middleware.js";

const userRatingValidatorMiddleware = [
    generalNumberValidatorMiddleware("userId")
        .custom(userExistValidatorMiddleware),
    imdbIdValidatorMiddleware()
];

export default userRatingValidatorMiddleware;