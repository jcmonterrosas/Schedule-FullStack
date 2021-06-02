const Color = require("../models/color");
const assert = require("assert");
//Default
const colors = [
  {
    _id: "Chartreuse",
    color: "#7FFF00",
  },
  {
    _id: "BlueViolet",
    color: "#8A2BE2",
  },
  {
    _id: "Aquamarine",
    color: "#7FFFD4",
  },
  {
    _id: "Chocolate",
    color: "#D2691E",
  },
  {
    _id: "Coral",
    color: "#FF7F50",
  },
  {
    _id: "Crimson",
    color: "#DC143C",
  },
  {
    _id: "Cyan",
    color: "#00FFFF",
  },
];

Color.exists({color:'#7FFF00'}, function (err, res) {
  if (err){
      console.log(err)
  }else{
    if (!res) {
      Color.collection.insertMany(colors, function (err, r) {
        assert.equal(null, err);
        assert.equal(7, r.insertedCount);
      });
    }
  }
});

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
  setColor,
};
