import mongoose from "mongoose";

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const donorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
      trim: true,
      minlength: [2, "Name must be at least 2 characters."],
      maxlength: [80, "Name must be at most 80 characters."],
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required."],
      enum: { values: BLOOD_GROUPS, message: "Blood group is not valid." },
    },
    location: {
      type: String,
      required: [true, "Location is required."],
      trim: true,
      maxlength: [80, "Location must be at most 80 characters."],
    },
    mobile: {
      type: String,
      required: [true, "Mobile number is required."],
      trim: true,
      match: [/^\d{10}$/, "Mobile number must be exactly 10 digits."],
    },
  },
  { timestamps: true }
);

donorSchema.index({ bloodGroup: 1, location: 1 });

const Donor = mongoose.model("Donor", donorSchema);
export default Donor;
