import {
    generalIdValidator,
    contentValidator,
    customCommentExistValidator,
    customUserExistValidator, customCommentEligibilityValidator
}
    from "./other.comment.validator.middleware..js";
const editCommentValidatorMiddleware = [
    contentValidator(),
    generalIdValidator("userId")
        .custom(customUserExistValidator),
    generalIdValidator("id")
        .custom(customCommentExistValidator)
        .custom(customCommentEligibilityValidator)
];

export default editCommentValidatorMiddleware;