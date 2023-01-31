import {
    generalIdValidator,
    contentValidator,
    imdbIdValidator,
    customUserExistValidator, customCommentExistValidator, customCommentNestingValidator
} from "./other.comment.validator.middleware..js";

const createCommentValidatorMiddleware = [
    generalIdValidator("userId")
        .custom(customUserExistValidator),
    imdbIdValidator(),
    contentValidator(),
    generalIdValidator("parentId")
        .optional()
        .custom(customCommentExistValidator)
        .custom(customCommentNestingValidator)
]

export default createCommentValidatorMiddleware;