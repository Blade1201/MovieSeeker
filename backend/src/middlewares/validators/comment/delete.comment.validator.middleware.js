import {
    commentExistValidator,
    commentEligibilityValidator
} from "./other.comment.validator.middleware..js";
import userExistValidatorMiddleware from "../userExist.validator.middleware.js";
import generalNumberValidatorMiddleware from "../generalNumber.validator.middleware.js";

const deleteCommentValidatorMiddleware = [
    generalNumberValidatorMiddleware("id")
        .custom(commentExistValidator),
    generalNumberValidatorMiddleware("userId")
        .custom(userExistValidatorMiddleware)
        .custom(commentEligibilityValidator)
];

export default deleteCommentValidatorMiddleware;