const mongoose = require("mongoose");

const express = require("express");
const config = require("./config");

const bodyParser = require("body-parser");
const cors = require("cors");

const UserModel = require("./models/UserModel");
const MeRouter = require("./router/MeRouter");
const TeamsRouter = require("./router/TeamsRouter");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(async (req, res, next) => {
    if (!req.headers.authorization) {
        return next();
    }

    let tokens = req.headers.authorization.split(" ");
    if (tokens.length !== 2) {
        return next();
    }

    let base64 = tokens[1];
    let raw = Buffer.from(base64, "base64").toString("utf-8");

    let [email, passwordHash] = raw.split(":");
    let data = await UserModel.findOne({ email: email, passwordHash: passwordHash });
    if (data) {
        req.user = data._id;
    }

    next();
});

app.get("/login", async (req, res) => {
    if (req.user) {
        let user = await UserModel.findById(req.user);

        return res.status(200).json(user?.toJSON());
    }

    return res.status(401).send("Not logged in");
});

// kayıt olma
app.post("/register", async (req, res) => {
    if (req.user) {
        return res.status(401).send("Already logged in");
    }

    let { email, passwordHash } = req.body;

    if (!email || !passwordHash) {
        return res.status(400).send("Missing email or password");
    }

    let flag = await UserModel.exists({ email: email });
    if (flag) {
        return res.status(400).send("Email already exists");
    }

    let data = await UserModel.create({ email: email, passwordHash: passwordHash });

    return res.json(data?.toJSON());
});

app.use("/me", MeRouter);
app.use('/teams', TeamsRouter);

app.all("*", async (req, res) => {
    return res.status(404).send("Not found");
});

mongoose.connection.on("connected", () => {
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
});


mongoose.connect(config.mongodb);
