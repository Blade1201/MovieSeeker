import * as subscriptionController from "../../controllers/subscription.controller.js"

const subscriptionNotExistValidatorMiddleware = async (_, {req}) => {
    const result = await subscriptionController.hasActiveSubscription(req.body.user);

    return result ? Promise.reject("Létező előfizetés!") : Promise.resolve();
};


export default subscriptionNotExistValidatorMiddleware;