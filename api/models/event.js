const mongoose = require('mongoose');
const timezone = require('mongoose-timezone')
const Schema = mongoose.Schema;


const eventSchema = new Schema(
    {
        name: {type: String, require: true},
        description: {type: String},
        place: {type: String, ref: 'City'},
        color: {type: String, ref: 'Color'},
        date: {type: String, require: true},
        startTime: {type: Date, require: true},
        endTime: {type: Date, require: true}
    },
    {
        versionKey: false
    }
);

// eventSchema.plugin(timezone);

module.exports = mongoose.model('Event', eventSchema);