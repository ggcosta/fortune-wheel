import mongoose, { Schema } from "mongoose";

const awardSchema = new Schema({
  name: String,
  amountGiven: Number,
  stockAmount: Number,
  chanceWeight: Number,
});

export default mongoose.models.Award || mongoose.model("Award", awardSchema);
