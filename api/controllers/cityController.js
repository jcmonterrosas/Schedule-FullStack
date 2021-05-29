const City = require("../models/city");

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
    setCity
};