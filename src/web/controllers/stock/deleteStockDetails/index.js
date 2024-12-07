const StockDetailTable = require("../../../../models/stockDetailTable");
const StockList = require("../../../../models/masterStockList");

const deleteStockDetails = async (req, res) => {
  try {
    // Extract the `stock_Id` from the request body
    const { stock_Id } = req.body;

    // Validate input
    if (!stock_Id) {
      return res.status(400).json({
        success: false,
        message: "Stock ID is required.",
      });
    }

    // Find and delete stock detail from StockDetailTable
    await StockDetailTable.findOneAndDelete({
      stock_Id,
    });

    await StockList.findOneAndDelete({
      isin_Num: stock_Id,
    });

    // Send success response
    res.status(200).json({
      success: true,
      message: "Stock details successfully deleted from both tables.",
    });
  } catch (error) {
    console.error("Error occurred in deleteStockDetails:", error);

    // Handle unexpected errors
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      error: error.message, // Include error message for debugging
    });
  }
};

module.exports = deleteStockDetails;
