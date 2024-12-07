const StockList = require("../../../../models/masterStockList");
const StockDetailTable = require("../../../../models/stockDetailTable");

const addStock = async (req, res) => {
  try {
    const { stockName, symbol, isin_Num, price } = req.body;

    // Validate input
    if (!stockName || !symbol || !isin_Num || !price) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Save stock in StockList schema
    const stock = new StockList({ stockName, symbol, isin_Num });
    const savedStock = await stock.save();

    // Save stock price details in StockDetailTable schema
    const stockDetails = new StockDetailTable({
      stock_Id: savedStock.isin_Num, // Map `isin_Num` to `stock_Id`
      price,
      createdBy: "Super Admin",
      updatedBy: "Super Admin",
    });

    const savedStockDetails = await stockDetails.save();

    return res.status(201).json({
      message: "Stock and stock details added successfully",
      stock: savedStock,
      stockDetails: savedStockDetails,
    });
  } catch (err) {
    console.error("Error adding stock and price details:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = addStock;
