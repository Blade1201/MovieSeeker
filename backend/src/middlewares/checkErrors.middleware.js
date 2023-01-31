import {validationResult} from "express-validator";
import retrieveValidationError from "../utils/authorization/retrieveValidationError.authorization.util.js";

const checkErrorsMiddleware = (req, res, next) => {
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

export default checkErrorsMiddleware;