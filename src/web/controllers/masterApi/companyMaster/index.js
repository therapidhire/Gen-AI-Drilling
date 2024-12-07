const CompanyMasterTable = require("../../../../models/companyMasterTable");

const companyMasterData = async (req, res) => {
  try {
    const { company_Name } = req.body;

    // Validate input
    if (!company_Name) {
      return res.status(400).json({ message: "Company name is required." });
    }

    // Create and save the company
    const newCompany = new CompanyMasterTable({ company_Name });
    await newCompany.save();

    res.status(201).json({
      message: "Company added successfully.",
      data: newCompany,
    });
  } catch (error) {
    if (error.code === 11000) {
      // Handle unique constraint violation
      return res.status(400).json({
        message: "Company name must be unique.",
      });
    }

    console.error("Error adding company:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = companyMasterData;
