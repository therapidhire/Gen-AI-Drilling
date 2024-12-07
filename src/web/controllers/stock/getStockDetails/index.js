const StockDetailTable = require("../../../../models/stockDetailTable");
const StockList = require("../../../../models/masterStockList");

// Get all stock details (Admin access)
const getAllStockDetails = async (req, res) => {
  try {
    const stockDetails = await StockDetailTable.find();
    const stockLists = await StockList.find();
    res.status(200).json({
      success: true,
      data: { stockDetails: stockDetails, stockLists: stockLists },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const getStockDetailsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const stocks = await StockDetailTable.aggregate([
      {
        $lookup: {
          from: "StockList",
          localField: "stock_Id",
          foreignField: "isin_Num",
          as: "stockInfo",
        },
      },
      {
        $project: {
          stockName: { $arrayElemAt: ["$stockInfo.stockName", 0] },
          symbol: { $arrayElemAt: ["$stockInfo.symbol", 0] },
          price: 1,
        },
      },
    ]);

    res.status(200).json({ success: true, data: stocks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllStockDetails, getStockDetailsByUserId };
