const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        sku: {
            type: String,
            required: true,
            unique: true,
        },

        category: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        quantity: {
            type: Number,
            required: true,
            min: 0
        },

        reorderLevel: {
            type: Number,
            required: true,
            min: 0
        },

        supplier: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

productSchema.virtual("stockValue").get(function () {
    return this.price * this.quantity;
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;