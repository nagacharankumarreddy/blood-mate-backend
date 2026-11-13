import express from "express";
import Donor, { BLOOD_GROUPS } from "../models/Donor.js";

const router = express.Router();

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// GET /api/donors?bloodGroup=O%2B&location=hyd
// Both filters are optional. Newest donors come first.
router.get("/", async (req, res, next) => {
  try {
    const { bloodGroup, location } = req.query;
    const filter = {};

    if (bloodGroup) {
      if (!BLOOD_GROUPS.includes(bloodGroup)) {
        return res.status(400).json({ message: "Blood group is not valid." });
      }
      filter.bloodGroup = bloodGroup;
    }
    if (typeof location === "string" && location.trim()) {
      filter.location = new RegExp(escapeRegExp(location.trim()), "i");
    }

    const donors = await Donor.find(filter).sort({ createdAt: -1, _id: -1 });
    res.json(donors);
  } catch (err) {
    next(err);
  }
});

// POST /api/donors
router.post("/", async (req, res, next) => {
  try {
    const { name, bloodGroup, location, mobile } = req.body ?? {};
    const donor = new Donor({ name, bloodGroup, location, mobile });

    // Field-by-field messages so the form can show them next to each input.
    const invalid = donor.validateSync();
    if (invalid) {
      const errors = Object.fromEntries(
        Object.entries(invalid.errors).map(([field, error]) => [field, error.message])
      );
      return res.status(400).json({ message: "Please correct the highlighted fields.", errors });
    }

    // One registration per phone number and blood group.
    const existing = await Donor.findOne({ mobile: donor.mobile, bloodGroup: donor.bloodGroup });
    if (existing) {
      return res.status(409).json({
        message: "This mobile number is already registered as a donor.",
        errors: { mobile: "This mobile number is already registered." },
      });
    }

    res.status(201).json(await donor.save());
  } catch (err) {
    next(err);
  }
});

export default router;
