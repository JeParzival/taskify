const express = require("express");
const { default: mongoose } = require("mongoose");
const TeamModel = require("../models/TeamModel");
const UserModel = require("../models/UserModel");
const TeamsRouter = express.Router();

// takımı getirme
TeamsRouter.get("/:id", async (req, res) => {
    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid id");
    }

    if (!req.user) {
        return res.status(401).send("Not logged in");
    }

    let id = mongoose.Types.ObjectId(req.params.id);

    let data = await TeamModel.findOne({ teamId: id, $or: [{ owner: req.user }, { members: req.user }] });
    if (!data) {
        return res.status(404).send("Team not found or you are not a member");
    }

    return res.json(data.toJSON());
});

// takım oluşturma
TeamsRouter.post("/", async (req, res) => {
    if (!req.user) {
        return res.status(401).send("Not logged in");
    }

    let { name, icon } = req.body;

    if (!name) {
        return res.status(400).send("Missing name");
    }

    let flag = await TeamModel.exists({ name: name });
    if (flag) {
        return res.status(400).send("Team name already exists");
    }

    let data = await TeamModel.create({ name: name, owner: req.user, icon: icon });

    return res.json(data?.toJSON());
});

// genel takım görevlerini getirme
TeamsRouter.get("/:id/tasks", async (req, res) => {
    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid id");
    }

    if (!req.user) {
        return res.status(401).send("Not logged in");
    }

    let id = mongoose.Types.ObjectId(req.params.id);

    let data = await TeamModel.findOne({ teamId: id, $or: [{ owner: req.user }, { members: req.user }] }, { tasks: 1 });
    if (!data) {
        return res.status(404).send("Team not found or you are not a member");
    }

    return res.json(data);
});

// genel takım görevlerini güncelleme
TeamsRouter.patch("/:id/tasks", async (req, res) => {
    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid id");
    }

    if (!req.user) {
        return res.status(401).send("Not logged in");
    }

    let id = mongoose.Types.ObjectId(req.params.id);

    let { tasks } = req.body;
    if (!tasks) {
        return res.status(400).send("Missing tasks");
    }

    let isAuthor = await TeamModel.exists({ owner: req.user, _id: teamId });
    if (!isAuthor) {
        return res.status(400).send("Not authorized");
    }

    let data = await TeamModel.updateOne({ teamId: id }, { $set: { tasks: tasks } });
    if (!data) {
        return res.status(404).send("Team not found or you are not a member");
    }

    return res.json(data);
});

// takıma davet etme
TeamsRouter.post("/:id/invite", async (req, res) => {
    if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid id");
    }

    if (!req.user) {
        return res.status(401).send("Not logged in");
    }

    let teamId = mongoose.Types.ObjectId(req.params.id);
    let { email } = req.body;

    if (!teamId || !email) {
        return res.status(400).send("Missing team id or email");
    }

    let isAuthor = await TeamModel.exists({ owner: req.user, _id: teamId });
    if (!isAuthor) {
        return res.status(400).send("Not authorized");
    }

    let userData = await UserModel.findOne({ email: email });
    if (!userData) {
        return res.status(400).send("Email does not exist");
    }

    let isInvited = await UserModel.exists({ _id: userData._id, "invites": teamId });
    if (isInvited) {
        return res.status(400).send("Already invited");
    }

    let memberInTeam = await TeamModel.exists({ _id: teamId, "members.user": userData._id });
    if (memberInTeam) {
        return res.status(400).send("Email is not a member of the team");
    }

    await UserModel.findOneAndUpdate({ _id: userData._id }, { $push: { invites: teamId } }, { setDefaultsOnInsert: true });
    return res.status(200).send("Invite sent");
});


module.exports = TeamsRouter;
