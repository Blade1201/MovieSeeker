import * as MediaController from "../../controllers/media.controller.js";

const mediaValidatorMiddleware = async (imdbId, {req}) => {
    try {
        await MediaController.createMediaIfNotExistAndGet(req);
        return Promise.resolve();
    } catch (reason) {
        return Promise.reject(reason);
    }
};

export default mediaValidatorMiddleware;