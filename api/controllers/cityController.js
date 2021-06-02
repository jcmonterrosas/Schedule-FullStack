const City = require("../models/city");
const assert = require("assert");
// Default
const cities = [
  {
    _id: "Bogotá",
    name: "Bogotá",
  },
  {
    _id: "Medellín",
    name: "Medellín",
  },
  {
    _id: "Cali",
    name: "Cali",
  },
  {
    _id: "Barranquilla",
    name: "Barranquilla",
  },
  {
    _id: "Cartagena",
    name: "Cartagena",
  },
];

City.exists({name:'Bogotá'}, function (err, res) {
  if (err){
      console.log(err)
  }else{
    if (!res) {
      City.collection.insertMany(cities, function (err, r) {
        assert.equal(null, err);
        assert.equal(5, r.insertedCount);
      });
    }
  }
});

const setCity = async (req, res) => {
  const newCity = new City(req.body);
  const savedCity = await newCity.save();
  res.json(savedCity);
};

const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    return res.json(cities);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getCities,
  setCity,
};
