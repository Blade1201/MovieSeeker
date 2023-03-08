import createJWT from "../utils/authentication/createJTW.authentication.util.js";

const authenticationHandlerMiddleware = (req, res) => {
    const {userId, username, rank} = req;

    const token = createJWT(userId, username, rank);

    let result;

    if (token) {
        res.cookie("access-token", token, {httpOnly: true});
        res.json({userId, username, rank});
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