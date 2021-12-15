const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");

router.post("/", async (req, res) => {

    let booking = await Booking.create(req.body);
    res.status(201).send({ Booking });
});

router.get("/", async (req, res) => {

    let booking = await Booking.find().lean();
    res.status(201).send({ booking });
});

router.get("/:id", async (req, res) => {

    let booking = await Booking.findById(req.params.id).lean();
    res.status(201).send({ booking });
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
