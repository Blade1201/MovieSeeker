const express = require('express');
const app = express();
const PORT = 5000;
const apiRouter = require("./routes/api");

app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
