const jwt = require("jsonwebtoken");
const {JWT_SECRET_KEY} = require("../../configs/authentication.config");
module.exports = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        res.json({
            success: false,
            reason: "Nem szolgáltatott tokent!"
        });

    } else {
        jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (!err) {
                res.userId = decoded.id;
                next();
            } else {
                res.json({
                    success: false,
                    reason: "Hiba történt a token érvenyesítése közben!"
                });
            }
        });
    }

}