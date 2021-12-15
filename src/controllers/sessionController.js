const express = require("express");
const router = express.Router();
const Session = require("../models/sessionModel");

router.post("/", async (req, res) => {

    let session = await Session.create(req.body);
    res.status(201).send({ session });
});

router.get("/", async (req, res) => {

    let session = await Session.find().lean();
    res.status(201).send({ session });
});

router.get("/:id", async (req, res) => {

    let session = await Session.findById(req.params.id).lean();
    res.status(201).send({ session });
});

router.patch("/:id", async (req, res) => {

    let session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).send({ session });
});


router.delete("/:id", async (req, res) => {

    let deletedSession = await Session.deleteOne({ _id: req.params.id });
    res.status(200).send({ deletedSession });
});

module.exports = router;