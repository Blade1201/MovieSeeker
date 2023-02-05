import RatingDao from "../../../dao/rating.dao.js";

const existRatingValidatorMiddleware = async (_, {req}) => {
    const {media, user} = req.body;

    const rating = await new RatingDao().findByPk(user["id"], media["id"]);

    if (rating) {
        req.body.rating = rating;
        return Promise.resolve();
    }

    return Promise.reject("Törölt vagy nem létező értékelés!");
}

export default existRatingValidatorMiddleware;