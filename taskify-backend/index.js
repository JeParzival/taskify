const mongoose = require("mongoose");

const express = require("express");
const config = require("./config");

const bodyParser = require("body-parser");
const cors = require("cors");

const user = require("./models/user");
const team = require("./models/team");

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

    let data = await user.findOne({ email: email, passwordHash: passwordHash });
    if (data) {
        req.user = data._id;
    }

    next();
});

app.post("/register", async (req, res) => {
    if (req.user) {
        return res.status(401).send("Already logged in");
    }

    let { email, passwordHash } = req.body;

    if (!email || !passwordHash) {
        return res.status(400).send("Missing email or password");
    }

    let flag = await user.exists({ email: email });
    if (flag) {
        return res.status(400).send("Email already exists");
    }

    let data = await user.create({ email: email, passwordHash: passwordHash });

    res.json(data?.toJSON());
});

app.post("/create/team", async (req, res) => {
    if (!req.user) {
        return res.status(401).send("Not logged in");
    }

    let { name, icon } = req.body;

    if (!name) {
        return res.status(400).send("Missing name");
    }

    let flag = await team.exists({ name: name });
    if (flag) {
        return res.status(400).send("Team name already exists");
    }

    let data = await team.create({ name: name, owner: req.user, icon: icon });

    res.json(data?.toJSON());
});

app.get("/my/tasks", async (req, res) => {
    if (!req.user) {
        return res.status(401).send("Not logged in");
    }

    let data = await user.findById(req.user, {
        tasks: 1
    });

    res.json(data?.tasks);
});

app.get("/my/teams", async (req, res) => {
    if (!req.user) {
        return res.status(401).send("Not logged in");
    }

    let data = await team.find({ "members.user": req.user });
    let json = data?.toJSON();

    return res.json(json);
});

mongoose.connection.on("connected", () => {
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
});


mongoose.connect(config.mongodb);
