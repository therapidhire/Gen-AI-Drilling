const StockList = require("../../../../models/masterStockList");

const addStock = async (req, res) => {
  const { StockName } = req.body;

  if (!StockName) {
    return res.status(400).json({ error: "StockName is required" });
  }

  try {
    // Create and save the new stock
    const newStock = new StockList({ StockName });
    await newStock.save();

    res
      .status(201)
      .json({ message: "Stock added successfully", stock: newStock });
  } catch (error) {
    // Handle validation and duplication errors
    if (error.code === 11000) {
      res.status(409).json({ error: "StockName already exists" });
    } else if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    } else {
      res
        .status(500)
        .json({ error: "An error occurred while adding the stock" });
    }
  }
};

module.exports = addStock;
