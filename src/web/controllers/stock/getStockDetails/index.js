const StockDetailTable = require("../../../../models/stockDetailTable");
const StockList = require("../../../../models/masterStockList");

// Get all stock details (Admin access)
// const getAllStockDetails = async (req, res) => {
//   try {
//     const stockDetails = await StockDetailTable.find();
//     const stockLists = await StockList.find();
//     res.status(200).json({
//       success: true,
//       data: { stockDetails: stockDetails, stockLists: stockLists },
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
// const getAllStockDetails = async (req, res) => {
//   try {
//     const mergedData = await StockList.aggregate([
//       {
//         $lookup: {
//           from: "StockDetailTable", // The collection name in the database (should match the collection name in MongoDB)
//           localField: "stock_Id", // The field in StockDetailTable that relates to StockList
//           foreignField: "isin_Num", // The field in StockList that matches stockListId
//           as: "stockListData", // The name of the new array field in the output
//         },
//       },
//       //   {
//       //     $unwind: "$stockListData", // If you expect only one matching document, this flattens the array
//       //   },
//     ]);

//     res.status(200).json({
//       success: true,
//       data: mergedData,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

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
    console.log("req.params;", req.params?._id);

    const { _id } = req.params;
    if (!_id) {
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
