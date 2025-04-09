import mongoose from "mongoose";

const donorSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  location: String,
  mobile: String,
});

const Donor = mongoose.model("Donor", donorSchema);
export default Donor;
