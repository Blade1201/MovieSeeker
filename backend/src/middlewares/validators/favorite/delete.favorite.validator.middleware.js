import generalNumberValidatorMiddleware from "../generalNumber.validator.middleware.js";
import userExistValidatorMiddleware from "../userExist.validator.middleware.js";
import imdbIdValidatorMiddleware from "../imdbId.validator.middleware.js";
import mediaValidatorMiddleware from "../media.validator.middleware.js";
import existFavoriteValidatorMiddleware from "./exist.favorite.validator.middleware.js";

const deleteFavoriteValidatorMiddleware = [
    generalNumberValidatorMiddleware("userId")
        .custom(userExistValidatorMiddleware),
    imdbIdValidatorMiddleware()
        .custom(mediaValidatorMiddleware)
        .custom(existFavoriteValidatorMiddleware)
];

export default deleteFavoriteValidatorMiddleware;