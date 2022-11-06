import User from "../model/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {sendMail} from '../middleware/SendMail';

//Signup
export const userSignup = async (req, res) => {
    try {
        const {firstname, lastname, add_line1, add_line2, state, city, mobileno, email} = req.body;
        const addUser = new User({
            firstname,
            lastname,
            address: {
              add_line1,
              add_line2,
              state,
              city
            },
            mobileno,
            email,
            password: bcrypt.hashSync(req.body.password, 8)
        });

        const result = await addUser.save();
        if(result) {
          let payload = {};
          payload._id = result._id;
  
          jwt.sign(
            payload,
            "smartData",
            {
              expiresIn: "24h",
            },
            (err, token) => {
              return res.send({
                status: true,
                statusCode: 200,
                message: "User Signup Successfull",
                Token: token,
                result: result,
              });
            }
          );
        }
    }
    catch (err) {
        // console.log(err);
        res.send({
          status: false,
          statusCode: 400,
          message: " User Signup UNSuccessfull",
          result: err,
      });
    }
};

//Login
export const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const result = await User.findOne({ email });
      if (!result) {
        res.send({
          status: false,
          message: "Email is Incorrect!!!",
        });
      }
  
      const isValid = bcrypt.compareSync(password, result.password);
  
      if (isValid) {
        let payload = {};
        payload._id = result._id;
        // payload.email = result.email;
  
        jwt.sign(
          payload,
          "smartData",
          {
            expiresIn: "24h",
          },
          (err, token) => {
            return res.send({
              status: true,
              message: "Login Success",
              Token: token,
              result: result,
            });
          }
        );
      } else {
        return res.send({
          status: false,
          message: "Password is incorrect",
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

//get data by ID
export const getUserDataById = async (req, res) => {
    try {
      let data = await User.findOne({
        _id: mongoose.Types.ObjectId(req.body._id),
      });
      console.log(data)
      res.send({
        status: true,
        message: "successfully getting data by ID",
        result: data,
      });
    } catch (e) {
      throw e;
    }
  };



// Update
// export const updateUser = async (req, res) => {
//   console.log("id",req.body.id);
//   try {
//     let data = {
     
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       address:{
//         add_line1: req.body.add_line1,
//         add_line2: req.body.add_line2,
//         city: req.body.city,
//         state: req.body.state,
//       },
//       mobileno: req.body.mobileno,
//     };
    

//     const result = await User.findByIdAndUpdate(
//       { _id: mongoose.Types.ObjectId(req.body._id) },
//       { $set: data },
//       { new:true }
//     );

//     if (!result) {
//       res.send({
//         status: false,
//         statusCode: 400,
//         message:"not success",
//         result: result,
//       });
//     } else {
//       res.send({
//         status: true,
//         statusCode: 200,
//         message: "Successfully Updated",
//         result: result,
//       });
//     }
//   } catch (e) {
//       throw e;
//     }
//   }


export const updateUser = async (req, res) => {
  console.log("id", req.body.firstname);
  try {
    let data = {}

    if (req.body.firstname) {
      data.firstname = req.body.firstname;
    }
    if (req.body.lastname) {
      data.lastname = req.body.lastname;
    }
    if (req.body.mobileno) {
      data.mobileno = req.body.mobileno;
    }

    if (req.body.add_line1) {
        data.address = {
        add_line1: req.body.add_line1,
        add_line2: req.body.add_line2,
        city: req.body.city,
        state: req.body.state,
      }

    }

    const result = await User.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body._id) },
      { $set: data },
      { new: true }
    );

    if (!result) {
      res.send({
        status: false,
        statusCode: 400,
        message: "not success",
        result: result,
      });
    } else {
      res.send({
        status: true,
        statusCode: 200,
        message: "Successfully Updated",
        result: result,
      });
    }
  } catch (e) {
    throw e;
  }
}


// Forget Password
export const forgetpassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const users = await User.findOne({ email: email });
      if (users) {
        const secret = User._id + "smartData";
        console.log(User._id);
        const token = jwt.sign({ userID: User._id }, secret, {
          expiresIn: "5m",
        });
        console.log(token);
        sendMail(
          "roshnimanmode07@gmail.com",
          req.body.email,
          "Forget Passoword",
          `<p>Click <u><a href="http://localhost:4200/reset-password?token=${token}&' +  '">here</a></u> to reset your password</p>`
        );
        res.send({ status: true, message: "Please reset your Password" });
      } else {
        res.send({
          status: false,
          message: "Email doesn't exists!! Enter a valid Email..",
        });
      }
    } else {
      res.send({ status: false, message: "Email Field is Required" });
    }
  } catch (e) {
    res.send({ status: false, messgae: "No Results Found", Result: e });
  }
};


// Reset Password
export const resetpassword = async (req, res) => {
  const { password, password_confirmation } = req.body;
  const { id, token } = req.params;
  console.log(req.params);
  const users = await User.findById(id);
  const new_secret = users._id + "smartData";
  try {
    jwt.sign(token, new_secret);
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({
          status: false,
          message:
            "New Password and Confirm New Password do not match Successfully",
          result: users,
        });
      } else {
        const newHashPassword = bcrypt.hashSync(password, 8);
        console.log(newHashPassword);

        await User.findByIdAndUpdate(users._id, {
          $set: { password: newHashPassword },
        });
        res.send({ status: true, message: "Password Reset Successfully" });
      }
    } else {
      res.send({ status: false, message: "All Fields are Required" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: false, message: "Invalid Token" });
  }
};