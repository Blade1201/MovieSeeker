import jwt from "jsonwebtoken";
import {JWT_SECRET_KEY} from "../configs/authentication.config.js";
const verifyJWTMiddleware = (req, res, next) => {
    const token = req.cookies["access-token"];


    if (!token) {
        res.status(400).json({
            success: false,
            reason: "Nem szolgáltatott tokent!"
        });

    } else {
        jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (!err) {
                req.body.userId = decoded.id;
                next();
            } else {
                res.status(500).json({
                    success: false,
                    reason: "Hiba történt a token érvenyesítése közben!"
                });
            }
        });
    }

}

export default verifyJWTMiddleware;