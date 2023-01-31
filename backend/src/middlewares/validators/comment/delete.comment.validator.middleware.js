import {
    generalIdValidator,
    customCommentExistValidator,
    customUserExistValidator, customCommentEligibilityValidator
} from "./other.comment.validator.middleware..js";

const deleteCommentValidatorMiddleware = [
    generalIdValidator("id")
        .custom(customCommentExistValidator),
    generalIdValidator("userId")
        .custom(customUserExistValidator)
        .custom(customCommentEligibilityValidator)
];

export default deleteCommentValidatorMiddleware;