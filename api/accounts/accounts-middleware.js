const accountsModel = require("../accounts/accounts-model");

exports.checkAccountPayload = async (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)

  if (!req.body.name || !req.body.budget) {
    res.status(400).json({ message: "name and budget are required" });
  } else {
    let name = req.body.name.trim();
    let budget = req.body.budget;

    if (name.length < 3 || name.length > 100) {
      res
        .status(400)
        .json({ message: "name of account must be between 3 and 100" });
    } else {
      if (budget < 0 || budget > 1000000) {
        res
          .status(400)
          .json({ message: "budget of account is too large or too small" });
      } else {
        req.newRecord = { name, budget };
        next();
      }
    }
  }
};

exports.checkAccountNameUnique = (req, res, next) => {};

exports.checkAccountId = (req, res, next) => {};
