const {generalIdValidator, contentValidator, customCommentExistValidator, customUserAndAuthValidator} = require("./commentValidationHandlers");
module.exports = editValidationHandler = [
    contentValidator(),
    generalIdValidator("id")
        .custom(customCommentExistValidator),
    generalIdValidator("userId")
        .custom(customUserAndAuthValidator)
];