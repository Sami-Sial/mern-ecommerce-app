const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/product.controllers.js");
const authMiddlewares = require("../middlewares/auth.js");
const multer = require("multer");
const { storage, cloudinary } = require("../config/cloudinary.config.js");
const upload = multer({ storage });

router.get("/products/filtered", productControllers.getFilteredProducts);

router.get("/products", productControllers.getAllProducts);

router.get("/products/searched", productControllers.getSearchedProducts);

router.get("/product/:id", productControllers.getProductDetails);

router.put("/product/featured/:id", productControllers.addToProductToFeatured);

router.put(
  "/product/featured/remove/:id",
  productControllers.removeProductFromFeatured
);

router.get(
  "/admin/products",
  authMiddlewares.isAuthenticatedUser,
  authMiddlewares.isAdmin,
  productControllers.getAdminProducts
);

router.post(
  "/admin/product/new",
  authMiddlewares.isAuthenticatedUser,
  authMiddlewares.isAdmin,
  upload.any(),
  productControllers.createProduct
);

router.put(
  "/admin/product/:id",
  authMiddlewares.isAuthenticatedUser,
  authMiddlewares.isAdmin,
  productControllers.updateProduct
);

router.delete(
  "/admin/product/:id",
  authMiddlewares.isAuthenticatedUser,
  authMiddlewares.isAdmin,
  productControllers.deleteProduct
);

router.put(
  "/review",
  authMiddlewares.isAuthenticatedUser,
  productControllers.createProductReview
);

router.get("/reviews", productControllers.getProductReviews);

router.delete(
  "/reviews",
  authMiddlewares.isAuthenticatedUser,
  productControllers.deleteReview
);

module.exports = router;
