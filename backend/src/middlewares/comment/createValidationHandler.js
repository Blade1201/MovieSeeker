const {body} = require("express-validator");
const checkExistOfImdbId = require("../../utils/comment/checkExistOfImdbId");
const CommentDAO = require("../../services/dao/CommentDAO");
const UserDAO = require("../../services/dao/UserDAO");
const {generalIdValidator, contentValidator} = require("./commentValidationHandlers");
const commentDAO = new CommentDAO();

const createValidationHandler = [
    generalIdValidator("userId")
        .custom((value, {req}) => {
            return new UserDAO()
                .findById(value)
                .then(user => {
                    if (user) {
                        req.body.user = user;
                        return Promise.resolve();
                    }
                    return Promise.reject("Törölt vagy nem létező felhasználó!");
                });
        }),

    body("imdbId")
        .exists()
        .bail()
        .withMessage("Nem található paraméter")
        .isLength({min: 9})
        .bail()
        .withMessage("Nem megfelelő hosszúság (9-255)")
        .custom(value => {
            return checkExistOfImdbId(value)
                .then(res => {
                    return res ?
                        Promise.resolve()
                        :
                        Promise.reject("Nem létező azonosító.")
                });
        }),

    generalIdValidator("parentId")
        .optional()
        .custom(value => {
            return commentDAO.findById(value)
                .then(res => {
                    if (res) {
                        if (res["parentId"] === null) {
                            return Promise.resolve();
                        }
                        return Promise.reject("A komment túllépi a maximális beágyazási szintet.");
                    }
                    return Promise.reject("Nincs ilyen idval rendelkező komment.");
                })
        }),
    contentValidator()
]

module.exports = createValidationHandler;