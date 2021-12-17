const express = require("express");
const router = express.Router();
const City = require("../models/cityModel");

router.post("/", async (req, res) => {

    let city = await City.create(req.body);
    res.status(201).send({ city });
});

router.get("/", async (req, res) => {

    let city = await City.find().lean();
    res.status(201).send({ city });
});

router.get("/:id", async (req, res) => {

    let city = await City.findById(req.params.id).lean();
    res.status(201).send({ city });
});

router.get("/centres/:city", async (req, res) => {

    let city = await City.find({ cityname: req.params.city }).populate("centreid").lean();
    res.status(201).send(city[0].centreid);
});


router.patch("/:id", async (req, res) => {

    let city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ city });
});


router.delete("/:id", async (req, res) => {

    let deletedCity = await City.deleteOne({ _id: req.params.id });
    res.status(200).send({ deletedCity });
});

module.exports = router;