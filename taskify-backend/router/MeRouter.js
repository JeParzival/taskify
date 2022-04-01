const express = require("express");
const { default: mongoose } = require("mongoose");
const TeamModel = require("../models/TeamModel");
const UserModel = require("../models/UserModel");
const MeRouter = express.Router();

// görevlerim
MeRouter.get("/tasks", async (req, res) => {
    if (!req.user) {
        return res.status(401).send("Not logged in");
    }

    let data = await UserModel.findById(req.user, {
        tasks: 1
    });

    return res.json(data?.tasks);
});

// takım verilerimi getir
MeRouter.get("/teams/:id/tasks", async (req, res) => {
    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid id");
    }
    let id = req.params.id;

    if (!req.user) {
        return res.status(401).send("Not logged in");
    }

    let data = await TeamModel.findOne({ teamId: id, $or: [{ owner: req.user }, { members: req.user }] }, { "members.$": 1, "tasks": 1 });
    console.log(data)
    if (!data) {
        return res.status(404).send("Team not found or you are not a member");
    }

    return res.json(data);
});

// takımlarım
MeRouter.get("/teams", async (req, res) => {
    if (!req.user) {
        return res.status(401).send("Not logged in");
    }

    let result = await TeamModel.find({ $or: [{ "members.user": req.user }, { owner: req.user }] }, { members: 1, name: 1, icon: 1 });
    return res.json(result);
});

// takım davetini kabul etme
MeRouter.post("/invite/:id/accept", async (req, res) => {
    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid id");
    }
    let teamId = req.params.id;

    if (!req.user) {
        return res.status(401).send("Not logged in");
    }

    if (!teamId) {
        return res.status(400).send("Missing email");
    }

    let flag = await UserModel.exists({ _id: req.user, invites: teamId });
    if (!flag) {
        return res.status(400).send("Not invited");
    }

    await UserModel.findOneAndUpdate({ _id: req.user }, { $pull: { invites: teamId } });
    await TeamModel.findOneAndUpdate({ _id: teamId }, { $addToSet: { members: { user: req.user } } });
    return res.status(200).send("Invite accepted");
})

// takım davetini reddetme
MeRouter.delete("/invite/:id", async (req, res) => {
    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid id");
    }
    let teamId = req.params.id;

    if (!req.user) {
        return res.status(401).send("Not logged in");
    }

    if (!teamId) {
        return res.status(400).send("Missing teamId");
    }

    let flag = await UserModel.exists({ _id: req.user, invites: teamId });
    if (!flag) {
        return res.status(400).send("Not invited");
    }

    await UserModel.findOneAndUpdate({ _id: req.user }, { $pull: { invites: teamId } });
    return res.status(200).send("Invite deleted");
});

module.exports = MeRouter;
