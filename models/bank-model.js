const mongoose = require('mongoose');
require('mongoose-double')(mongoose);
const schemaTypes = mongoose.Schema.Types;
const Schema = mongoose.Schema;

const bankSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    savings: {
        type: schemaTypes.Double,
        default: 0,
        min: 0
    },
    date: {
        type: Date,
        required: true
    }
},
{
    timestamps: true
});

module.exports = Bank = mongoose.model('Bank', bankSchema);