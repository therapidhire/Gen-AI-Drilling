const updateStockDetails = async (req, res) => {
  try {
    res.send({
      status: 200,
      message: "this is updateStockDetails api",
    });
  } catch (error) {
    console.error("error", error);
  }
};

module.exports = updateStockDetails;
