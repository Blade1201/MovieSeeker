import {register} from "../../controllers/user.authorization.controller.js";

const registrationAuthorizationMiddleware = async (req, res, next) => {
    const {id, username, rank} = await register(req.body);

    if (id) {
        req.userId = id;
        req.username = username;
        req.rank = rank;
        req.avatarPath = null;
        next();
    } else {
        return res.status(500).json({
            success: false,
            reason: "Szerverhiba!"
        });
    }
}

export default registrationAuthorizationMiddleware;