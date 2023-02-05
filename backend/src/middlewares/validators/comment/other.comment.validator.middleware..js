import {body} from "express-validator";
import CommentDao from "../../../dao/comment.dao.js";

export const contentValidator = () => {
    return body("content")
        .exists()
        .bail()
        .withMessage("Nem található paraméter")
        .isLength({min: 5, max: 1024})
        .bail()
        .withMessage("Nem megfelelő hosszúság (5-1024)")
};

export const commentExistValidator = (id, {req}) => {
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

export const commentNestingValidator = (id, {req}) => {
    const {comment} = req.body;

    if (comment["parentId"] === null) {
        return Promise.resolve();
    }
    return Promise.reject("A komment meghaladja a maximális (2) beágyazási szintet!");
};

export const commentEligibilityValidator = (userId, {req}) => {
    const {user, comment} = req.body;

    return user.hasTheEligibilityToModifyComment(comment).then(res => {
       if (res) {
           return Promise.resolve();
       }
       return Promise.reject("Hiányzó jogosultság a komment módosításához.");
    });
};
