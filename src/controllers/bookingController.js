const axios = require("axios").default;
const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Session = require("../models/sessionModel");

router.post("/", async (req, res) => {

    let booking = await Booking.create(req.body);

    axios
    .patch(`${process.env.BACKEND_URL}/users/trialikes/${req.body.userid}`, { trials:1 })
    .then(res => {
        console.log("data", res.data)
    })
    .catch(err => {
        console.log("Error", err);
    })

    res.status(201).send({ booking });
});

router.get("/", async (req, res) => {

    let booking = await Booking.find().lean();
    res.status(201).send({ booking });
});

router.get("/:id", async (req, res) => {

    let booking = await Booking.findById(req.params.id).lean();
    res.status(201).send({ booking });
});


router.get("/availableslots/:date/:sessionname/:centreid", async (req, res) => {

    let session = await Session.find({sessionname:req.params.sessionname}).populate(['slotsid']).lean();

    let allslots = session[0].slotsid

    let booking = await Booking.find({ $and: [ { date: req.params.date }, { sessionid: session[0]._id }, { centreid: req.params.centreid }] }).populate(['userid', 'centreid','sessionid','slotsid']).lean();
    
    let bookedslots = booking.map((e)=>e.slotsid.slotTime)

    let filteredslots = allslots.filter((e) => !bookedslots.includes(e.slotTime));

    res.status(201).send({ bookedslots,allslots,filteredslots });

});

router.patch("/:id", async (req, res) => {

    let booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ booking });
});


router.delete("/:id", async (req, res) => {

    let deletedBooking = await Booking.deleteOne({ _id: req.params.id });
    res.status(200).send({ deletedBooking });
});

module.exports = router;
