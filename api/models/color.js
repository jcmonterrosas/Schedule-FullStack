const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Default
const colors = [
    {
        "_id": "Chartreuse",
        "color": "#7FFF00"
    },
    {
        "_id": "BlueViolet",
        "color": "#8A2BE2"
    },
    {
        "_id": "Aquamarine",
        "color": "#7FFFD4"
    },
    {
        "_id": "Chocolate",
        "color": "#D2691E"
    },
    {
        "_id": "Coral",
        "color": "#FF7F50"
    },
    {
        "_id": "Crimson",
        "color": "#DC143C"
    },
    {
        "_id": "Cyan",
        "color": "#00FFFF"
    }
  ]
  
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