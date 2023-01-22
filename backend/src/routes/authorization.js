const express = require("express");
const registerVerificationHandlerMW = require("../middlewares/authorization/registrationValidationHandler");
const loginVerificationHandlerMW = require("../middlewares/authorization/loginValidationHandler")
const checkErrorsMW = require("../middlewares/checkErrors");
const handleRegistrationMW = require("../middlewares/authorization/handleRegistration");
const handleLoginMW = require("../middlewares/authorization/handleLogin");
const authenticationHandlerMW = require("../middlewares/authentication/authenticationHandler");
const verifyJWTMW = require("../middlewares/authentication/verifyJWT");


const router = express.Router();

router.use(express.json());

router.post("/register",
    verifyJWTMW,
    registerVerificationHandlerMW,
    checkErrorsMW,
    handleRegistrationMW,
    authenticationHandlerMW);



router.post("/login",
    verifyJWTMW,
    loginVerificationHandlerMW,
    checkErrorsMW,
    handleLoginMW,
    authenticationHandlerMW
    );

module.exports = router;