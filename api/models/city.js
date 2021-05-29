const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Default
const cities = [
    {
        "_id": "Bogotá",
        "name": "Bogotá"
    },
    {
        "_id": "Medellín",
        "name": "Medellín"
    },
    {
        "_id": "Cali",
        "name": "Cali"
    },
    {
        "_id": "Barranquilla",
        "name": "Barranquilla"
    },
    {
        "_id": "Cartagena",
        "name": "Cartagena"
    }
]

const citySchema = new Schema(
    {
        _id: {type: String},
        name: {type: String}
    },
    {
        versionKey: false
    }
);


module.exports = mongoose.model('City', citySchema);