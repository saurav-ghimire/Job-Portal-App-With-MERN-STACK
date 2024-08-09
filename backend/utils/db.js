import mongoose from "mongoose";

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('Database Connected SUccessfully');
  } catch (error) {
    console.log(error)
  }
}

export default connectDB;