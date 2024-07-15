import mongoose, { Schema } from "mongoose";

const awardSchema = new Schema({
  name: String,
  amountGiven: Number,
});

export default mongoose.models.Award || mongoose.model("Award", awardSchema);
