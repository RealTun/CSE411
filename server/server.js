const express = require('express');
const config = require("./config/config");
const cors = require('cors');
const app = express();

const userRouters = require('./src/routes/userRoutes');
const groupRouters = require('./src/routes/groupRoutes');
const pointRouters = require("./src/routes/api.routes");

const port = config.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(config.corsOptions));

app.use("/api/user", userRouters);
app.use("/api/point", pointRouters);
app.use("/api/group", groupRouters);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
