const userLogin = require("../../utils/authorization/userLogin");

module.exports = async (req, res, next) => {
    const id = await userLogin(req.body);

    if (id) {
        req.userId = id;
        next();
    } else {
        res.status(400).json({
            success: false,
            blameUser: true,
            reason: "Helytelen felhasználónév-jelszó páros!"
        });
    }
}