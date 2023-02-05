import {
    contentValidator,
    commentExistValidator,
    commentEligibilityValidator
}
    from "./other.comment.validator.middleware..js";
import userExistValidatorMiddleware from "../userExist.validator.middleware.js";
import generalNumberValidatorMiddleware from "../generalNumber.validator.middleware.js";
const editCommentValidatorMiddleware = [
    contentValidator(),
    generalNumberValidatorMiddleware("userId")
        .custom(userExistValidatorMiddleware),
    generalNumberValidatorMiddleware("id")
        .custom(commentExistValidator)
        .custom(commentEligibilityValidator)
];

export default editCommentValidatorMiddleware;