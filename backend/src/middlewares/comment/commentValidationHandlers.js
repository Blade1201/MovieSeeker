const {body} = require("express-validator");
const CommentDAO = require("../../services/dao/CommentDAO");
const UserDAO = require("../../services/dao/UserDAO");

exports.generalIdValidator = (fieldName) => {
    return body(fieldName)
        .exists()
        .bail()
        .withMessage("Nem található paraméter")
        .isNumeric()
        .bail()
        .withMessage("Nem numerikus paraméter.")
}

exports.contentValidator = () => {
    return body("content")
        .exists()
        .bail()
        .withMessage("Nem található paraméter")
        .isLength({min: 5, max: 1024})
        .bail()
        .withMessage("Nem megfelelő hosszúság (5-1024)")
};

exports.customCommentExistValidator = (id, {req}) => {
    return new CommentDAO()
        .findById(id)
        .then(comment => {
            if (comment) {
                req.body.comment = comment;
                return Promise.resolve();
            }
            return Promise.reject("Törölt vagy nem létező komment.");
        })
};

exports.customUserAndAuthValidator = (userId, {req}) => {
    return new UserDAO()
        .findById(userId)
        .then(async user => {
            if (user) {
                const result = await user.hasTheRightToModifyComment(req.body.comment);
                if (result) {
                    return Promise.resolve();
                }
                return Promise.reject("Hiányzó jogsultság a komment módosításához.");
            }
            return Promise.reject("Törölt vagy nem létező felhasználó!");
        });
};