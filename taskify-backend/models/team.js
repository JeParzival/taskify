const mongoose = require("mongoose");

const Permissions = {
    OWNER: 0,
    ADMIN: 1,
    MEMBER: 2,
};

const TeamMemberSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },

    tasks: {
        type: mongoose.Types.ObjectId,
        ref: "task"
    },

    permission: {
        type: Number,
        default: Permissions.MEMBER
    }
});

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    owner: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },

    members: {
        type: [TeamMemberSchema],
        default: []
    },

    icon: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model("team", TeamSchema);
