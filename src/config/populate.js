import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import jsonProducts from "../utils/jsonProducts.js";

dotenv.config();

(async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log(`MongoDB Connected: ${connect.connection.host}`);
    process.exit(0);
  } catch (error) {
    console.log(`There was an Error: ${error.message}`);
    process.exit(1);
  }
})();
