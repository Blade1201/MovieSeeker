import generalNumberValidatorMiddleware from "../generalNumber.validator.middleware.js";
import userExistValidatorMiddleware from "../userExist.validator.middleware.js";
import imdbIdValidatorMiddleware from "../imdbId.validator.middleware.js";
import mediaValidatorMiddleware from "../media.validator.middleware.js";
import notExistFavoriteValidatorMiddleware from "./notExist.favorite.validator.middleware.js";

const createFavoriteValidatorMiddleware = [
    generalNumberValidatorMiddleware("userId")
        .custom(userExistValidatorMiddleware),
    imdbIdValidatorMiddleware()
        .custom(mediaValidatorMiddleware)
        .custom(notExistFavoriteValidatorMiddleware)
];

export default createFavoriteValidatorMiddleware;