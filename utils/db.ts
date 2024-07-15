import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  const mongo_uri = process.env.MONGO_URI;
  console.log("mongo_uri", mongo_uri);
  if (!mongo_uri) {
    throw new Error("MongoDB URI is not defined.");
  }

  try {
    await mongoose.connect(mongo_uri);
    console.log("Connected to MongoDB");
    return true;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}

export default connectDb;