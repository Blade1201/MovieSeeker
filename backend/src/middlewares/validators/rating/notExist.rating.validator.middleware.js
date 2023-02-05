import * as RatingController from "../../../controllers/rating.controller.js"

const notExistRatingValidatorMiddleware = async (_, {req}) => {
    const {media, user} = req.body;
    const exists = await RatingController.exists(user, media);


    if (!exists) {
        return Promise.resolve();
    }
    return Promise.reject("Az értékelés már létezik!");
}


export default notExistRatingValidatorMiddleware;