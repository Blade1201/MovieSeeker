import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRouter from "./src/routes/api.route.js";
import authorizationRouter from "./src/routes/authorization.route.js";
import authenticationRouter from "./src/routes/authentication.route.js";
import commentsRouter from "./src/routes/comments.route.js";
import ratingRouter from "./src/routes/rating.route.js";
import favoriteRouter from "./src/routes/favorite.route.js";
import subscriptionRouter from "./src/routes/subscription.route.js";
import {PORT} from "./src/configs/server.config.js";
import associationsInitializer from "./src/utils/assocationsInitalizer.util.js";
associationsInitializer();

const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(cookieParser());

app.use("/api", apiRouter);
app.use("/authorization", authorizationRouter);
app.use("/authentication", authenticationRouter);
app.use("/comments", commentsRouter);
app.use("/rating", ratingRouter);
app.use("/favorite", favoriteRouter);
app.use("/subscription", subscriptionRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});