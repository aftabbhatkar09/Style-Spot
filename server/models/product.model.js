import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User Id is reuired"],
      ref: "UserModel",
    },
    name: {
      type: String,
      required: [true, "User's name is required"],
    },
    rating: {
      type: Number,
      reuired: [true, "Review rating is required"],
      default: 0,
    },
    comment: {
      type: String,
      reuired: [true, "Review comment is required"],
    },
  },
  {
    timestamps: true,
  },
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User Id is required"],
      ref: "UserModel",
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is reuired"],
    },
    description: {
      type: String,
      reuired: [true, "Product description is required"],
    },
    image: {
      type: String,
      reuired: [true, "Product image is reuired"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
    },
    brand: {
      type: String,
      reuired: [true, "Product brand is required"],
    },
    countInStock: {
      type: Number,
      reuired: [true, "Product count in stock is required"],
      default: 0,
    },
    rating: {
      type: Number,
      required: [true, "Product rating is required"],
      default: 0,
    },
    numReviews: {
      type: Number,
      required: [true, "Product number of reviews is required"],
      default: 0,
    },
    content: {
      type: String,
      required: [true, "Product content is required"],
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
    collection: "products",
  },
);

const ProductModel = mongoose.model("ProductModel", productSchema);

export default ProductModel;
