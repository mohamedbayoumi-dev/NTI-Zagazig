import mongoose from "mongoose";
import Products from "./products.interface";

const productsSchema = new mongoose.Schema<Products>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.ObjectId, ref: "categories" },
    subcategory: { type: mongoose.Schema.ObjectId, ref: "subcategories" },
    price: { type: Number, required: true },
    discount: { type: Number },
    priceAfterDiscount: { type: Number },
    quantity: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    rateAvg: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    cover: String,
    images: [String],
  },
  {
    timestamps: true,
  }
);


productsSchema.pre<Products>(/^find/, function (next) {
  this.populate({ path: "subcategory", select: "_id name img" });
  next();
});

export default mongoose.model<Products>("products", productsSchema);
