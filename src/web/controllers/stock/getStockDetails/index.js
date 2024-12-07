const StockDetailTable = require("../../../../models/stockDetailTable");
const StockList = require("../../../../models/masterStockList");

// Get all stock details (Admin access)
const getAllStockDetails = async (req, res) => {
  try {
    const stockDetails = await StockDetailTable.find().populate({
      path: "stockListData", // Virtual field name defined in StockDetailTable schema
      select: "stockName symbol isin_Num", // Specify fields to include from StockList
    });

    res.status(200).json({
      success: true,
      data: stockDetails,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStockDetailsByUserId = async (req, res) => {
  try {
    console.log("Request received with params:", req.params);

    // Extracting the `_id` parameter from the query
    const { _id } = req.query;
    console.log("_id_id_id_id_id_id:", _id);

    // Validate the `_id` parameter
    if (!_id) {
      return res
        .status(400)
        .json({ success: false, message: "Stock ID is required." });
    }

    // Fetch data from StockDetailTable and populate data from StockList
    const stockDetails = await StockDetailTable.findOne({ _id })
      .populate({
        path: "stockListData", // Virtual reference in StockDetailTable schema
        select: "stockName symbol isin_Num", // Fields to fetch from StockList
      })
      .exec();

    // Handle case when no matching stock is found
    if (!stockDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Stock not found." });
    }

    // Send success response with data
    res.status(200).json({
      success: true,
      data: stockDetails,
    });
  } catch (error) {
    console.error("Error occurred in getStockDetailsByUserId:", error);

    // Handle unexpected errors
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      error: error.message, // Include error message for debugging
    });
  }
};

module.exports = { getAllStockDetails, getStockDetailsByUserId };
