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

// const express = require("express");
// const router = express.Router();
// const students = require("../schema/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const { body, validationResult } = require("express-validator");
// const nodemailer = require("nodemailer");

// const jwtsecret = "piyush";

// // Configure nodemailer
// const transporter = nodemailer.createTransport({
//   host: 'smtp.mailtrap.io',
//   port: 2525,
//   secure: false,
//   ignoreTLS: true,
//   secureConnection: false,
//   requiresAuth: true,
//   auth: {
//     user: "pmimpiyush2@gmail.com", // Hardcode It
//     pass: "ppsh2625@IRON" // Hardcode It
//   },
//   tls:{
//      rejectUnauthorized: false,
//   //    ciphers: "SSLv3"
//   },
//   debug: true, // show debug output
//   logger: true // log information in console


// });

// // Generate a 4-digit OTP
// const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// // Endpoint to send OTP
// router.post(
//   "/send-otp",
//   [body("email","write a valid email").isEmail()],
//   async (req, res) => {
//        const result = validationResult(req);
//     if (!result.isEmpty()) {
// const resultarray = result.array();
//       return res.status(404).json(resultarray[0].msg);
//     }
//     const OTP = generateOTP();
   
//     const { email } = req.body;
//     try {
//       const studentcheck = await students.findOne({ email });
//       if (studentcheck.password) {
//         return res.status(400).json("User already exists with this email");
//       }
// if(studentcheck.otp){
//   return res.status(400).json("OTP Sent Already");
// }

//       const mailOptions = {
//         from: 'pmimpiyush2@gmail.com',
//         to: email,
//         subject: 'OTP for Registration on MyAllies',
//         text: `Your OTP is ${OTP}`
//       };

//      transporter.sendMail(mailOptions, async (error, info) => {
//         if (error) {
//           return res.status(500).json("Error sending email");
//         }

//         const newStudent = await students.create({
//           email:email,
//           otp:OTP,
//          otpExpiry: Date.now() + 10 * 60 * 1000 // OTP valid for 10 minutes
//         });
        

//         res.json("OTP sent successfully");
//       });
//     } catch (error) {
//       res.status(500).json("Something went wrong");
//     }
//   }
// );

// // Endpoint to register using OTP and password
// router.post(
//   "/register",
//   [
//     body("email", "Enter a valid email").isEmail(),
//     body("otp", "OTP must be 4 digits").isLength({ min: 4, max: 4 }),
//     body("password", "Password should be longer than 6 digits").isLength({ min: 6 }),
//     body("confirmpassword", "Confirm Password should be longer than 6 digits").isLength({ min: 6 })
//   ],
//   async (req, res) => {
//     const result = validationResult(req);
//     if (!result.isEmpty()) {
//       return res.status(400).json(result.array()[0].msg);
//     }

//     const { email, otp, password, confirmpassword } = req.body;

//     try {
//       const student = await students.findOne({ email });
//       if (!student) {
//         return res.status(404).json("User with this email does not exist");
//       }

//       if (student.otp !== otp || Date.now() > student.otpExpiry) {
//         return res.status(400).json("Invalid or expired OTP");
//       }

//       if (password !== confirmpassword) {
//         return res.status(400).json("Passwords do not match");
//       }

//       const salt = await bcrypt.genSalt(10);
//       const passwordhash = await bcrypt.hash(password, salt);

//       student.password = passwordhash;
//       student.otp = undefined;
//       student.otpExpiry = undefined;
//       await student.save();

//       const data = {
//         user: {
//           id: student.id
//         }
//       };
//       const token = jwt.sign(data, jwtsecret);
//       res.json(token);
//     } catch (error) {
//       res.status(500).json("Something went wrong");
//     }
//   }
// );

// router.post(
//   "/",
//   [
//     body("email", "Write a valid email").isEmail(),
//     body("password", "Password should be longer than 6 digits").isLength({ min: 6 })
//   ],
//   async (req, res) => {
//     const result = validationResult(req);
//     if (!result.isEmpty()) {
//       return res.status(400).json(result.array()[0].msg);
//     }

//     const { email, password, confirmpassword } = req.body;

//     try {
//       const studentcheck = await students.findOne({ email });
//       if (studentcheck) {
//         return res.status(400).json("User already exists with this email");
//       }
//       if (password !== confirmpassword) {
//         return res.status(400).json("Passwords are not the same");
//       }

//       const salt = await bcrypt.genSalt(10);
//       const passwordhash = await bcrypt.hash(password, salt);

//       const student = await students.create({
//         email,
//         password: passwordhash
//       });

//       const data = {
//         user: {
//           id: student.id
//         }
//       };
//       const token = jwt.sign(data, jwtsecret);
//       res.json(token);
//     } catch (error) {
//       res.status(500).json("Something went wrong");
//     }
//   }
// );

// module.exports = router;
