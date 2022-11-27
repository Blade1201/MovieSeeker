const searchMedia = require("../utils/api/searchMedia");
const searchDetails = require("../utils/api/searchDetails");
const express = require("express");
const handleSearchMW = require("../middlewares/api/handleSearch");

const router = express.Router();

router.get("/", handleSearchMW);

module.exports = router;