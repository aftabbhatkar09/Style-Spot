import colors from "colors";
import dotenv from "dotenv";

import users from "./data/user.data.js";
import connectDB from "./config/db.config.js";
import products from "./data/products.data.js";
import UserModel from "./models/user.model.js";
import OrderModel from "./models/order.model.js";
import ProductModel from "./models/product.model.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await UserModel.deleteMany();
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();

    const createdUsers = await UserModel.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await ProductModel.insertMany(sampleProducts);

    console.log("Data Imported!".bgGreen);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.underline);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await UserModel.deleteMany();
    await OrderModel.deleteMany();
    await ProductModel.deleteMany();

    console.log("Data Destroyed!".bgRed);
    process.exit();
  } catch (error) {
    console.error(`${error.message}`.red.underline);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
