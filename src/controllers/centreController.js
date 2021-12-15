const express = require("express");
const router = express.Router();
const Centre = require("../models/centreModel");

router.post("/", async (req, res) => {

    let centre = await Centre.create(req.body);
    res.status(201).send({ centre });
});

router.get("/", async (req, res) => {

    let centre = await Centre.find().lean();
    res.status(201).send({ centre });
});

router.get("/:id", async (req, res) => {

    let centre = await Centre.findById(req.params.id).lean();
    res.status(201).send({ centre });
});

router.patch("/:id", async (req, res) => {

    let centre = await Centre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ centre });
});


router.delete("/:id", async (req, res) => {

    let deletedCentre = await Centre.deleteOne({ _id: req.params.id });
    res.status(200).send({ deletedCentre });
});

module.exports = router;