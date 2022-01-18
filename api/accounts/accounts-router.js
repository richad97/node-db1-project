const router = require("express").Router();
const accountsModel = require("../accounts/accounts-model");
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
} = require("./accounts-middleware");

router.get("/", async (req, res, next) => {
  try {
    const accountsArr = await accountsModel.getAll();

    res.json(accountsArr);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const specificAccount = await accountsModel.getById(req.params.id);

    if (specificAccount.length === 0) {
      res.status(404).json({ message: "account not found" });
    } else {
      res.json(specificAccount[0]);
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/", checkAccountPayload, async (req, res, next) => {
  try {
    const createdRecord = await accountsModel.create(req.newRecord);
    res.status(201).json(createdRecord[0]);
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", checkAccountPayload, async (req, res, next) => {
  try {
    const updatedRecord = await accountsModel.updateById(
      req.params.id,
      req.newRecord
    );
    if (updatedRecord.length === 0) {
      res.status(404).json({ message: "account not found" });
    } else {
      res.status(200).json(updatedRecord[0]);
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const deletedAccount = await accountsModel.deleteById(req.params.id);

    if (deletedAccount === 0) {
      res.status(404).json({ message: "account not found" });
    } else {
      res.json(deletedAccount);
    }
  } catch (err) {
    console.log(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
});

module.exports = router;
