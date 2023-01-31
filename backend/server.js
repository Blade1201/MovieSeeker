import express from "express";
import apiRouter from "./src/routes/api.route.js";
import authorizationRouter from "./src/routes/authorization.route.js";
import authenticationRouter from "./src/routes/authentication.route.js";
import commentsRouter from "./src/routes/comments.route.js";
import {PORT} from "./src/configs/server.config.js";
import associationsInitializer from "./src/utils/assocationsInitalizer.util.js";
associationsInitializer();
const app = express();

app.use("/api", apiRouter);
app.use("/authorization", authorizationRouter);
app.use("/authentication", authenticationRouter);
app.use("/comments", commentsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
