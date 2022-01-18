const db = require("../../data/db-config");

const getAll = () => {
  return db("accounts");
};

const getById = (id) => {
  return db("accounts").where({ id });
};

const create = async (account) => {
  const createdAccount = await db("accounts").insert(account);
  return getById(createdAccount[0]);
};

const updateById = async (id, account) => {
  await db("accounts").where({ id }).update(account);
  return getById(id);
};

const deleteById = (id) => {
  return db("accounts").where({ id }).del();
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
