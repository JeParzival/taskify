const mongoose = require("mongoose");

const UserSettingsSchema = new mongoose.Schema({
    fullName: String,
    featuredTeam: {
        type: mongoose.Types.ObjectId,
        ref: "team"
    },
    title: String
});

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        default: null
    },
    tasks: {
        type: [mongoose.Types.ObjectId],
        ref: "task",
        default: []
    },
    invites: {
        type: [mongoose.Types.ObjectId],
        ref: "team",
        default: []
    },

    settings: {
        type: UserSettingsSchema,
        default: {}
    }
}, { timestamps: true });

module.exports = mongoose.model("user", UserSchema);
