import express from "express";
import Donor from "../models/Donor.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const { name, bloodGroup, location, mobile } = req.body;
  const donor = new Donor({ name, bloodGroup, location, mobile });

  try {
    const newDonor = await donor.save();
    res.status(201).json(newDonor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
