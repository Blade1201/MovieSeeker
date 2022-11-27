const express = require("express");
const apiRouter = require("./src/routes/api");
const authorizationRouter = require("./src/routes/authorization");
const authenticationRouter = require("./src/routes/authentication");
const {PORT} = require("./src/configs/server.config");
const app = express();

app.use("/api", apiRouter);
app.use("/authorization", authorizationRouter);
app.use("/authentication", authenticationRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
