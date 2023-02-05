import {
    contentValidator, commentExistValidator, commentNestingValidator
} from "./other.comment.validator.middleware..js";
import imdbIdValidatorMiddleware from "../imdbId.validator.middleware.js";
import userExistValidatorMiddleware from "../userExist.validator.middleware.js";
import generalNumberValidatorMiddleware from "../generalNumber.validator.middleware.js";
import mediaValidatorMiddleware from "../media.validator.middleware.js";

const createCommentValidatorMiddleware = [
    generalNumberValidatorMiddleware("userId")
        .custom(userExistValidatorMiddleware),
    imdbIdValidatorMiddleware()
        .custom(mediaValidatorMiddleware),
    contentValidator(),
    generalNumberValidatorMiddleware("parentId")
        .optional()
        .custom(commentExistValidator)
        .custom(commentNestingValidator)
]

export default createCommentValidatorMiddleware;