const mongoose = require("mongoose");

let sessionSchema = new mongoose.Schema({
    sessionname: { type: String, trim:true, required: true },
    slotsid:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "slot",
        required: true,
      }]
},
{ 
    versionKey: false,
    timestamps: true,
});


let Session = mongoose.model("session",sessionSchema);

module.exports = Session;