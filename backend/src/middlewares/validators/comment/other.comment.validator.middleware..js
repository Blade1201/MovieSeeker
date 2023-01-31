import {body, check} from "express-validator";
import CommentDao from "../../../dao/comment.dao.js";
import UserDao from "../../../dao/user.dao.js";
import checkExistOfImdbId from "../../../utils/comment/checkExistOfImdbId.comment.util.js";

export const generalIdValidator = (fieldName) => {
    return body(fieldName)
        .exists()
        .bail()
        .withMessage("Nem található paraméter")
        .isNumeric()
        .bail()
        .withMessage("Nem numerikus paraméter.")
}

export const contentValidator = () => {
    return body("content")
        .exists()
        .bail()
        .withMessage("Nem található paraméter")
        .isLength({min: 5, max: 1024})
        .bail()
        .withMessage("Nem megfelelő hosszúság (5-1024)")
};

export const customUserExistValidator = (value, {req}) => {
    return new UserDao()
        .findById(value)
        .then(user => {
            if (user) {
                req.body.user = user;
                return Promise.resolve();
            }
            return Promise.reject("Törölt vagy nem létező felhasználó!");
        });
}

export const customCommentExistValidator = (id, {req}) => {
    return new CommentDao()
        .findById(id)
        .then(comment => {
            if (comment) {
                req.body.comment = comment;
                return Promise.resolve();
            }
            return Promise.reject("Törölt vagy nem létező komment.");
        })
};

export const customCommentNestingValidator = (id, {req}) => {
    const {comment} = req.body;

    if (comment["dType"] === "C") {
        return Promise.resolve();
    }
    return Promise.reject("A komment meghaladja a maximális (2) beágyazási szintet!");
};

export const customCommentEligibilityValidator = (userId, {req}) => {
    const {user, comment} = req.body;

    return user.hasTheEligibilityToModifyComment(comment).then(res => {
       if (res) {
           return Promise.resolve();
       }
       return Promise.reject("Hiányzó jogosultság a komment módosításához.");
    });
};

export const imdbIdValidator = () => {
    return check("imdbId")
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
        })
}