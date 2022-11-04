import User from "../model/User";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

//Update
// export const updateUserData = async (req, res) => {
//     console.log(req.body);
//     try {
//       let jsondata = {
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         address:{
//           add_line1: req.body.add_line1,
//           add_line2: req.body.add_line2,
//           state: req.body.state,
//           city: req.body.city,  
//         },
//         mobileno: req.body.mobileno,
//       };

//       User.findByIdAndUpdate(
//         { _id: mongoose.Types.ObjectId(req.body._id) },
//         { $set: jsondata },
//         { new: true },
//         (err, result) => {
//           if (err) {
//             res.send({ status: false, message: "Unable to Update", result: err });
//           } else {
//             res.send({ status: true, message: "Successfully Updated", result: result });
//           }
//         }
//       );
//     } catch (e) {
//       throw e;
//     }
//   };


export const updateUser = async (req, res) => {
  console.log("id",req.body.id);
  try {
    let data = {
     
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      address:{
        add_line1: req.body.add_line1,
        add_line2: req.body.add_line2,
        city: req.body.city,
        state: req.body.state,
      },
      mobileno: req.body.mobileno,
    };
    

    const result = await User.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(req.body._id) },
      { $set: data },
      { new:true }
    );

    if (!result) {
      res.send({
        status: false,
        statusCode: 400,
        message:"not success",
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
      throw e;
    }
  }