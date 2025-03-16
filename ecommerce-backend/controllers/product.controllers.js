const Product = require("../models/product.model");
const ErrorHandler = require("../utils/ErrorHandler");
const AsyncErrorHandler = require("../utils/AsyncErrorHandler");

// Create Product => Admin
module.exports.createProduct = AsyncErrorHandler(async (req, res) => {
  req.body.user = req.user._id;

  const productDetails = new Product(req.body);

  if (req.files) {
    req.files.map((file) => {
      let public_id = file.filename;
      let url = file.path;
      let object = { public_id, url };
      productDetails.images.push(object);
    });
  }

  const newProduct = await productDetails.save();

  res.status(201).json({
    success: true,
    newProduct,
  });
});

// Get Products with filters and search query
module.exports.getFilteredProducts = AsyncErrorHandler(async (req, res) => {
  const {
    category = [],
    brand = [],
    price = 0,
    ratings = 0,
    currentPage = 1,
  } = req.query;

  let filters = {};
  if (category.length) {
    filters.category = { $in: category.split(",") };
  }
  if (brand.length) {
    filters.brand = { $in: brand.split(",") };
  }
  filters.ratings = { $gte: ratings };
  filters.price = { $gte: price };

  const resultPerPage = 20;
  const skip = resultPerPage * (currentPage - 1);
  console.log(currentPage);
  console.log(skip);

  const totalProducts = await Product.countDocuments();
  const totalPages = Math.ceil(totalProducts / resultPerPage);

  let products = await Product.find(filters).skip(skip).limit(resultPerPage);

  res.status(200).json({
    success: true,
    products,
    totalPages,
  });
});

// Get searched products
module.exports.getSearchedProducts = AsyncErrorHandler(async (req, res) => {
  const { search_query } = req.query;

  const keyword = search_query
    ? {
        name: { $regex: search_query, $options: "i" },
      }
    : {};

  const products = await Product.find(keyword);

  res.status(200).json({
    success: true,
    products,
  });
});

// Add product to faetured products
module.exports.addToProductToFeatured = AsyncErrorHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { featured: true },
    { new: true }
  );

  res.status(200).json({
    success: true,
    product,
  });
});

// Remove product from featured products
module.exports.removeProductFromFeatured = AsyncErrorHandler(
  async (req, res) => {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { featured: false },
      { new: true }
    );

    res.status(200).json({
      success: true,
      product,
    });
  }
);

// get all products without filters
module.exports.getAllProducts = AsyncErrorHandler(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Get Admin Products
module.exports.getAdminProducts = AsyncErrorHandler(async (req, res) => {
  const { currentPage } = req.query;

  if (currentPage == "undefined") {
    let products = await Product.find();
    res.status(200).json({ success: true, products });
    return;
  }

  const resultPerPage = 7;
  const skip = resultPerPage * (currentPage - 1);

  const totalProducts = await Product.countDocuments();
  const totalAdminProdutsPages = Math.ceil(totalProducts / resultPerPage);
  console.log(currentPage);
  console.log(skip);

  let products = await Product.find().skip(skip).limit(resultPerPage);
  res.status(200).json({
    success: true,
    products,
    totalAdminProdutsPages,
  });
});

// Get Product Details
module.exports.getProductDetails = AsyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  console.log(product);

  if (!product) {
    return next(new ErrorHandler(404, "Product Not Found"));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product => Admin
module.exports.updateProduct = AsyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product Not Found"));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product => Admin
module.exports.deleteProduct = AsyncErrorHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product Not Found"));
  }

  await Product.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});

// Create New Review or Update the review
module.exports.createProductReview = AsyncErrorHandler(
  async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);
    console.log(product.reviews);

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    console.log(isReviewed);

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  }
);

// Get All Reviews of a product
module.exports.getProductReviews = AsyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
module.exports.deleteReview = AsyncErrorHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
