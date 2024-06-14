const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const {
  addUser,
  getUser,
  checkUserExists,
  getAllUsers,
} = require("../models/user");

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).send({ message: "User retrieved", payload: users });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    if (firstName && lastName && email && password) {
      // Check if user already exists
      const existingUser = await checkUserExists(email);
      if (existingUser[0].exists) {
        return res.status(409).send({ message: "Email already registered" });
      }

      // Password encryption
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(password, salt);

      await addUser(firstName, lastName, email, hashPassword);
      res
        .status(200)
        .send({ message: "Sign up succesfull", signUpSuccess: true });
    } else {
      res.status(400).send({ message: "Missing user details" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const user = await getUser(email);
      if (user.length === 0) {
        return res.status(401).send({ message: "Incorrect Email or Password" });
      }

      const validPassword = await bcrypt.compare(password, user[0].password);

      if (!validPassword) {
        return res.status(401).send({ message: "Incorrect Email or Password" });
      }

      res.status(200).send({
        message: "Login successful",
        loginSuccess: true,
        payload: user,
      });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;
