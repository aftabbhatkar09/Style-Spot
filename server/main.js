import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import connectDB from "#config/db.config.js";
import userRoutes from "#routes/user.route.js";
import orderRoutes from "#routes/order.route.js";
import productRoutes from "#routes/product.route.js";
import { errorHandler } from "#middlewares/error.middleware.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json()); // Request body parsing
app.use(cookieParser()); // Cookies parsing and reading

app.use(morgan("dev"));

// Ensure database connection for requests
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);

app.get("/api/v1/config/paypal", (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID });
});

app.use(errorHandler);

if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(
      `Server is running in ${process.env.NODE_ENV} mode on port ${port}`.cyan
        .bold,
    );
  });
}

export default app;
