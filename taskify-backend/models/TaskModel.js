const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    checked: {
        type: Boolean,
        default: false,
    },

    expireDate: {
        type: Date,
        default: Date.now()
    }

}, { timestamps: true });

module.exports = mongoose.model("task", TaskSchema);
