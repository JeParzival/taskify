const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
    teamId: {
        type: mongoose.Types.ObjectId,
        required: true
    },

    inviter: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    }
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
        type: [InviteSchema],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model("user", UserSchema);
