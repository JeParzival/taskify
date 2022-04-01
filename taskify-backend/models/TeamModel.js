const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },

    tasks: {
        type: [mongoose.Types.ObjectId],
        ref: "task",
        default: []
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

    tasks: {
        type: Array,
        default: []
    },

    icon: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model("team", TeamSchema);
