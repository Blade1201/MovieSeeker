import express from "express";
import apiSearchController from "../controllers/apiSearch.controller.js";

const apiRouter = express.Router();

apiRouter.get("/", apiSearchController);

export default apiRouter;