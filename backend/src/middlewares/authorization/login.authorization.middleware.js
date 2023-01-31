import {login} from "../../controllers/user.authorization.controller.js";


const loginAuthorizationMiddleware = async (req, res, next) => {
    const result = await login(req.body);

    if (result) {
        req.userId = result.id;
        req.username = result.username;
        req.rank = result.rank;
        next();
    } else {
        res.status(400).json({
            success: false,
            blameUser: true,
            reason: "Helytelen felhasználónév-jelszó páros!"
        });
    }
}

export default loginAuthorizationMiddleware;