const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const historySchema = new Schema({
    title: {
        type: String,
        maxlength: 50
    },
    notes: {
        type: String,
        maxlength: 100
    },
    creationDate: {
        type: Date,
        required: true
    },
    data: {
        type: Array,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    isDeleted:{
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = History = mongoose.model('History', historySchema);