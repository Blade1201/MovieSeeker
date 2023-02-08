import FavoriteDao from "../../../dao/favorite.dao.js";

const existFavoriteValidatorMiddleware = async (_, {req}) => {
    const {user, media} = req.body;

    const result = await new FavoriteDao().findByPk(user, media);

    if (result) {
        req.body.favorite = result;
        return Promise.resolve();
    }
    return Promise.reject("Ez a média nincs a kedvencek között!");
}

export default existFavoriteValidatorMiddleware;