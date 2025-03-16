const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Product Name"],
    },
    description: {
        type: String,
        required: [true, "Please enter Product Description"],
    },
    price: {
        type: Number,
        required: [true, "Please enter Product Price"],
        maxLength: [8, "Product Price cannot exceed 8 characters"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    images: [
        {
            public_id: { type: String, required: true },
            url: {type: String, required: true},
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter Product Category"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter Product Stock"],
        maxLength: [4, "Product Stock cannot exceed 4 characters"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            name: { type: String, required: true },
            rating: { type: String, required: true },
            comment: { type: String, required: true },
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})


const Product = mongoose.model("Product", productSchema);

module.exports = Product;