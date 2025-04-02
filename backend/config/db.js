import mongoose from "mongoose";
export const connectDB = async () => {
  console.log("ijh");

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected at " + conn.connection.host);
  } catch (error) {
    throw error;
  }
};
