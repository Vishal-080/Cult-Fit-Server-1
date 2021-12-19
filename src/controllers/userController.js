const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.get("/:id", async (req, res) => {

    let user = await User.findById(req.params.id).lean();
    res.status(201).send({ user });
});

router.patch("/trialikes/:id", async (req, res) => {

    let post = await User.findByIdAndUpdate(req.params.id, { $inc: { trials: 1 } }, { new: true });
    res.status(200).send({ post });
});

module.exports = router;
