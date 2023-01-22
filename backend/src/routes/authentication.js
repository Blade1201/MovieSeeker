const express = require("express");
const router = express.Router();

router.use(express.json());

const verifyJWTMW = require("../middlewares/authentication/verifyJWT");

router.get("/", verifyJWTMW, (req, res) => {
    res.json({
        success: true
    })
})
module.exports = router;