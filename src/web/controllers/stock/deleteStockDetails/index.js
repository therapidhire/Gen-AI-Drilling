const deleteStockDetails = async (req, res) => {
  try {
    res.send({
      status: 200,
      message: "this is deleteStockDetails api",
    });
  } catch (error) {
    console.error("error", error);
  }
};

module.exports = deleteStockDetails;
