import {login} from "../../controllers/user.authorization.controller.js";
import * as subscriptionController from "../../controllers/subscription.controller.js";


const loginAuthorizationMiddleware = async (req, res, next) => {
    const result = await login(req.body);

    if (result) {
        req.userId = result.id;
        req.username = result.username;
        req.rank = result.rank;
        req.subscribed = await subscriptionController.hasActiveSubscription(result);
        req.avatarPath = result.avatarPath;
        next();
    } else {
        res.status(400).json({
            success: false,
            reason: "Helytelen felhasználónév-jelszó páros!"
        });
    }
}

export default loginAuthorizationMiddleware;