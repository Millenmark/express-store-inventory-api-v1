import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      default: 0,
    },
    company: {
      type: String,
      // enum: ["ikea", "liddy", "caressa", "marcos"],
      enum: {
        values: ["ikea", "liddy", "caressa", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
