const addStockDetails = async (req, res) => {
  try {
    res.send({
      status: 200,
      message: "this is addStockDetails api",
    });
  } catch (error) {
    console.error("error", error);
  }
};

module.exports = addStockDetails;
