const mongoose = require("mongoose");

let centreSchema = new mongoose.Schema({
    centrename: { type: String, trim:true, required: true },
    address:{ type: String, trim:true, required: true },
    photo:{ type: String, trim:true, required: true }
},
{ 
    versionKey: false,
    timestamps: true,
});


let Centre = mongoose.model("centre",centreSchema);

module.exports = Centre;