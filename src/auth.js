const express = require("express");
const routes = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secrete_key =
  "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";

const User = require("../models/user");

routes.post("/signup", async (req, resp) => {
  const { username, password } = req.body;
  const hashedpass = await bcrypt.hash(password, 10);
  try {
    const newUser = User.create({
      username: username,
      password: hashedpass,
    });
    resp.send("User registered successifully");
  } catch (error) {
    resp.send("Problems");
  }
});

routes.post("/signin", async (req, resp) => {
  const { username, password } = req.body;

  const savedUser = await User.findOne({
    where: {
      username: username,
    },
  });

  if (savedUser == null) {
    resp.status(400).json({
      error: "User does not exist",
    });
  }

  const ispasswordvalid = await bcrypt.compare(
    password,
    savedUser.get("password")
  );

  if (!ispasswordvalid) {
    return resp.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ username: savedUser.username }, secrete_key);

  resp.status(200).json({ token: token });
});

module.exports = routes;
