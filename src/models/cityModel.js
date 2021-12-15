const mongoose = require("mongoose");

let citySchema = new mongoose.Schema({
    cityname: { type: String, trim:true, required: true },
    centreid:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "centre",
        required: true,
      }]
},
{ 
    versionKey: false,
    timestamps: true,
});


let City = mongoose.model("city",citySchema);

module.exports = City;