const getStockDetails = async (req, res) => {
  try {

    
    res.send({
      status: 200,
      message: "this is getStockDetails api",
    });
  } catch (error) {
    console.error("error", error);
  }
};

module.exports = getStockDetails;
