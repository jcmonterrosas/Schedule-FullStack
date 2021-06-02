const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema(
  {
    _id: { type: String },
    name: { type: String },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("City", citySchema);
