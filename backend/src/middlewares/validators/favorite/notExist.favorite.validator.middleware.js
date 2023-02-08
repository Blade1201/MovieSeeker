import {exist} from "../../../controllers/favorite.controller.js"

const notExistFavoriteValidatorMiddleware = async (_, {req}) => {
    const {user, media} = req.body;

    const result = await exist(user, media);

    if (result) {
        return Promise.reject("A média már a kedvencekhez lett adva!");
    }
    return Promise.resolve();
};

export default  notExistFavoriteValidatorMiddleware;