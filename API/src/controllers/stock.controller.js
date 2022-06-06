import { request } from "express";

const Stock = require("../models/stock");
const { Op } = require("sequelize");

const getAll = async (req, res) => {
  const { id } = req.params;
  Stock.findAll({
    where: {
      [Op.or]: {
        userId: id,
      },
    },
  }).then((result) => {
    console.log("result", result);
    res.json(result);
  });
};

const addStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { currency, name, symbol } = req.body;
    console.log("body", req.body);
    Stock.create({
      name,
      symbol,
      currency,
      userId: id,
    }).then((result) => {
      console.log("result", result);
      res.json(result);
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { symbol } = req.body;
    console.log("body", req.body);
    Stock.destroy({
      where: {
        userId: 1,
        symbol,
      },
    }).then((result) => {
      console.log("result", result);
      res.json(result);
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const methods = {
  getAll,
  addStock,
  deleteStock,
};
