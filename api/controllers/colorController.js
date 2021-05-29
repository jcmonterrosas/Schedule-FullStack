const Color = require("../models/color");

const setColor = async (req, res) => {
    const newColor = new Color(req.body);
    const savedColor = await newColor.save();
    res.json(savedColor);
  };

const getColors = async (req, res) => {
    try {
      const colors = await Color.find();
      return res.json(colors);
    } catch (error) {
      res.json(error);
    }
  };

module.exports = {
    getColors,
    setColor
};
