import ProductModel from "#models/product.model.js";

/**
 * @desc		Fetch all products
 * @route		GET /api/v1/products
 * @access	Public
 */
const getProducts = async (req, res) => {
  const products = await ProductModel.find({});
  res.json(products);
};

/**
 * @desc		Fetch single product by ID
 * @route		GET /api/v1/products/:id
 * @access	Public
 */
const getProductById = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

/**
 * @desc		Create product
 * @route		POST /api/v1/products
 * @access	Private/Admin
 */
const createProduct = async (req, res) => {
  const product = new ProductModel({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
    content: "Sample content",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

export { getProducts, getProductById, createProduct };
