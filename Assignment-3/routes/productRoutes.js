
const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const validateProduct = require("../middleware/validateProduct");

router.post("/", validateProduct, async (req, res, next) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json(product);

    } catch (error) {
        next(error);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const { category, sortBy, order, page, limit } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        let sort = {};

        if (sortBy) {
            sort[sortBy] = order === "desc" ? -1 : 1;
        }

        const currentPage = parseInt(page) || 1;
        const itemsPerPage = parseInt(limit) || 10;

        const skip = (currentPage - 1) * itemsPerPage;

        const total = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .sort(sort)
            .skip(skip)
            .limit(itemsPerPage);

        res.status(200).json({
            total,
            page: currentPage,
            totalPages: Math.ceil(total / itemsPerPage),
            count: products.length,
            products
        });

    } catch (error) {
        next(error);
    }
});

router.get("/low-stock", async (req, res, next) => {
    try {
        const lowStockProducts = await Product.aggregate([
            {
                $match: {
                    $expr: {
                        $lte: ["$quantity", "$reorderLevel"]
                    }
                }
            }
        ]);

        res.status(200).json({
            count: lowStockProducts.length,
            products: lowStockProducts
        });

    } catch (error) {
        next(error);
    }
});

router.get("/summary", async (req, res, next) => {
    try {
        const summary = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalItems: { $sum: 1 },
                    totalQuantity: { $sum: "$quantity" },
                    totalStockValue: {
                        $sum: {
                            $multiply: ["$price", "$quantity"]
                        }
                    },
                    avgPrice: { $avg: "$price" }
                }
            }
        ]);

        res.status(200).json({
            categories: summary.length,
            summary: summary
        });

    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json(product);

    } catch (error) {
        next(error);
    }
});

router.put("/:id", validateProduct, async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json(product);

    } catch (error) {
        next(error);
    }
});

router.patch("/:id/stock", async (req, res, next) => {
    try {
        const { change } = req.body;

        if (typeof change !== "number" || change === 0) {
            return res.status(400).json({
                message: "Please provide a valid stock change"
            });
        }

        const product = await Product.findById(req.params.id);

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            return next(error);
        }

        if (product.quantity + change < 0) {
            return res.status(400).json({
                message: "Insufficient stock"
            });
        }

        product.quantity += change;

        await product.save();

        res.status(200).json({
            message: "Stock updated",
            product
        });

    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            const error = new Error("Product not found");
            error.statusCode = 404;
            return next(error);
        }

        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        next(error);
    }
});


module.exports = router;
