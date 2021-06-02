const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const colorSchema = new Schema(
    {
        _id: {type: String},
        color: {type: String}
    },
    {
        versionKey: false
    }
);


module.exports = mongoose.model('Color', colorSchema);