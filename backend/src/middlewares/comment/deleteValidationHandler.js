const { generalIdValidator, customCommentExistValidator, customUserAndAuthValidator} = require("./commentValidationHandlers");

exports.deleteValidationHandler = [
    generalIdValidator("id")
        .custom(customCommentExistValidator),
    generalIdValidator("userId")
        .custom(customUserAndAuthValidator)
];