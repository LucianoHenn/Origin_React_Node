import { getConnection } from "./../database/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config";
const User = require("../models/user");
const { Op } = require("sequelize");

const saltRounds = 10;

const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    if (name.length === 0 || password.length === 0)
      res.status(400).json({ message: "Bad Request. Please fill all fields." });
    User.findOne({ where: { name } }).then((result) => {
      console.log("result", result);
      if (result) {
        bcrypt.compare(
          password,
          result.dataValues.password,
          (error, success) => {
            if (success) {
              const id = result.dataValues.id;
              const token = jwt.sign({ id }, authConfig.secret, {
                expiresIn: 86400, // 24 hours
              });
              res.status(200).send({
                id: result.dataValues.id,
                username: result.dataValues.name,
                auth: true,
                token,
              });
            } else {
              res
                .status(401)
                .send({ message: "Wrong username/password combination!" });
            }
          }
        );
      } else {
        res.send({ message: "User doesnt exist!" });
      }
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const isUserAuth = (req, res) => {
  res.send({ message: "User is Authenticated!", auth: true });
};

const createNew = async function (req, res) {
  try {
    const { name, password, email } = req.body;
    if (name.length === 0 || password.length === 0)
      return res
        .status(400)
        .json({ message: "Bad Request. Please fill all fields." });
    //   check data has already been created
    const checkData = await User.findAll({
      where: {
        [Op.or]: {
          name,
        },
      },
    });
    if (checkData.length > 0) {
      return res.status(500).json({ message: "username is already in use" });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          res.send({ error: err });
        }
        await User.create({
          name,
          password: hash,
          email,
        }).then((result) => {
          res.status(201).json({
            message: "user successful created",
            data: {
              username: name,
            },
          });
        });
      });
    }
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const methods = {
  login,
  isUserAuth,
  createNew,
};
