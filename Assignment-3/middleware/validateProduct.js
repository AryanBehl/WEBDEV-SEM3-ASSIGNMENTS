const validateProduct = (req, res, next) => {
    const { name, sku, category, price, quantity, reorderLevel, supplier } = req.body;

    if (
        !name ||
        !sku ||
        !category ||
        price === undefined ||
        quantity === undefined ||
        reorderLevel === undefined ||
        !supplier
    ) {
        return res.status(400).json({
            message: "All product fields are required"
        });
    }

    if (
        typeof price !== "number" ||
        typeof quantity !== "number" ||
        typeof reorderLevel !== "number"
    ) {
        return res.status(400).json({
            message: "Price, quantity and reorderLevel must be numbers"
        });
    }

    if (price < 0 || quantity < 0 || reorderLevel < 0) {
        return res.status(400).json({
            message: "Price, quantity and reorderLevel cannot be negative"
        });
    }

    next();
};

module.exports = validateProduct;
