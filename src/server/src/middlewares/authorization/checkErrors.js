const {validationResult} = require("express-validator");
const retrieveValidationError = require("../../utils/authorization/retrieveValidationError");

module.exports = (req, res, next) => {
    const errors = validationResult(req)["errors"];

    if (errors.length === 0) {
        next();
        return;
    }

    res.status(400).json({
        success: false,
        blameUser: true,
        ...retrieveValidationError(errors),
    });

};