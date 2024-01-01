const express = require("express");
const routes = express.Router();
const secrete_key =
  "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header.slice(7);
  console.log(token);

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, secrete_key, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Failed to authenticate token" });
    }

    req.decoded = decoded;
    next();
  });
};

routes.get("/getusers", verifyToken, async (req, resp) => {
  const users = await User.findAll();
  resp.send(users);
});

routes.get("/getuser", async (req, resp) => {
  const { username } = req.body;
  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  resp.send(user);
});

module.exports = routes;
