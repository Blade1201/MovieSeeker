import createJWT from "../utils/authentication/createJTW.authentication.util.js";

const authenticationHandlerMiddleware = (req, res) => {
    const token = createJWT(req.userId, req.username, req.rank);

    let result;

    if (token) {
        result = {
            success: true,
            token
        }
    } else {
        result = {
            success: false,
            blameUser: false,
            reason: "Szerverhiba!"
        }
        res.status(500);
    }

    res.json(result);
};

export default authenticationHandlerMiddleware;