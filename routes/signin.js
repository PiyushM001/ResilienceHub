const express = require("express");
const router = express.Router();
const students = require("../schema/user");
const bcrypt = require("bcrypt");
const jwtsecret = "piyush";
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

router.post(
  "/",
  [body("email","write a valid email").isEmail(), body("password","Password should be longer than 6 digits ").isLength({ min: 6 })],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
const resultarray = result.array();
      return res.status(404).json(resultarray[0].msg);
    }

    const { email, password, confirmpassword } = req.body;

    try {
      const studentcheck = await students.findOne({ email });
      if (studentcheck) {
        res.status(404).json("user already exist with this email");
        return;
      }
      if (password !== confirmpassword) {
        res.status(404).json(" passwords are not same ");
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const passwordhash = await bcrypt.hash(req.body.password, salt);

      const student = await students
        .create({
          email: req.body.email,
          password: passwordhash
        })
      
      const data = {
        user: {
          id: student.id,
        },
      };
      const token = jwt.sign(data, jwtsecret);
      res.json(token);
    } catch (error) {
      res.status(404).send("something went wrong");
      return;
    }
  }
);
module.exports = router;
