const mongoose = require("mongoose");

let bookingSchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.Types.ObjectId,ref: "user",required: true},
    centreid: {type: mongoose.Schema.Types.ObjectId,ref: "centre",required: true},
    sessionid: {type: mongoose.Schema.Types.ObjectId,ref: "session",required: true},
    slotsid: {type: mongoose.Schema.Types.ObjectId,ref: "slot",required: true},
    date: { type: String, trim: true, required: true },
    payment: { type: String, trim: true, required: true }
},
    {
        versionKey: false,
        timestamps: true,
    });


let Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;