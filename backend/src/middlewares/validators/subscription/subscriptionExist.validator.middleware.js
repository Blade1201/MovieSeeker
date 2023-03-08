import * as subscriptionController from "../../../controllers/subscription.controller.js";

const subscriptionExistValidatorMiddleware = async (_, {req}) => {
    const result = await subscriptionController.hasActiveSubscription(req.body.user);

    return result ? Promise.resolve() : Promise.reject("Hiányzó előfizetés!");
};

export default subscriptionExistValidatorMiddleware;