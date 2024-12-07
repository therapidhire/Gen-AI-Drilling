const StockDetailTable = require("../../../../models/stockDetailTable");
const updateStockDetails = async (req, res) => {
  try {
    console.log("Request received with body:");

    // Extract the `_id` and `price` from the request body
    const { _id, price } = req.body;

    // Validate input
    if (!_id || price == null) {
      return res.status(400).json({
        success: false,
        message: "Stock ID and price are required.",
      });
    }

    // Validate price is a number
    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a positive number.",
      });
    }

    // Find and update the stock price
    const updatedStock = await StockDetailTable.findOneAndUpdate(
      { _id }, // Find stock by ID
      { price }, // Update price and updatedAt
      { new: true } // Return the updated document
    )
      .populate({
        path: "stockListData", // Virtual reference
        select: "stockName symbol isin_Num", // Fields to include from StockList
      })
      .exec();

    // Handle case when stock is not found
    if (!updatedStock) {
      return res.status(404).json({
        success: false,
        message: "Stock not found.",
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: "Stock price updated successfully.",
      data: updatedStock,
    });
  } catch (error) {
    console.error("Error occurred in updateStockPrice:", error);

    // Handle unexpected errors
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later.",
      error: error.message, // Include error message for debugging
    });
  }
};

module.exports = updateStockDetails;
