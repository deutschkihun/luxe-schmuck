import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'
import crypto from 'crypto';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'
dotenv.config();

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password")
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const userExists = await User.findOne({ email: email });
  if(userExists) {
    res.status(400) 
    throw new Error("Already registered email")
  } 
  
  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
  });

  res.status(201).json({
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
  
});

// @description     Get user profile
// @route           GET /api/users/profile
// @access          Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @description     Update user profile
// @route           POST /api/users/profile
// @access          Private
const updateUserProfile = asyncHandler(async (req, res) => {
  let {firstname,lastname,email,password} = await req.body
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const updatedUser = await User.findOneAndUpdate({_id:req.user._id},{
      firstname,
      lastname,
      password,
      email
    },{
        new:true,
        runValidators:true,
    })

  if (updatedUser) {
    res.json({
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @description   Get all users
// @route         GET /api/users
// @access        Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @description    Delete user
// @route          DELETE /api/users/:id
// @access         Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @description    Get user by ID
// @route          GET /api/users/:id
// @access         Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @description    Update user
// @route          PUT /api/users/:id
// @access         Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const findEmail = asyncHandler(async (req,res) => {
  const {firstname,lastname} = await req.body
  const findEmail = await User.findOne({firstname,lastname})
  if(findEmail) {
    res.send(findEmail.email)
  } else {
    res.status(404)
    throw new Error('Email not found');
  }
})

const findPW = asyncHandler(async (req,res) => {
  const {firstname,lastname,email} = await req.body;
  const randomDigits = crypto.randomInt(100000,999999).toString()
  const findPW = await User.findOne({firstname,lastname,email})

  if(findPW) {
    let transporter = nodemailer.createTransport({
      pool: true,
      host: "smtp.netcorecloud.net",
      port: 587,
      auth: {
        user: process.env.ID,
        pass: process.env.PW
      },
      tls: {
          rejectUnauthorized: false
      }
    });
  
    // send mail with defined transport object
    await transporter.sendMail({
      from: "info@deutschkihun.com",
      to: email,
      subject: "Your verification code", // Subject line
      text: `Your verification code is ${randomDigits}`,
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
    res.json({
      email,
      pin:randomDigits
    })
  } else {
    res.status(404)
    throw new Error('No user was found that matches the information')
  }
})

const resetPW = asyncHandler( async(req,res) => {
  let {email,password} = await req.body 
  console.log(email,password)
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const resetUser = await User.findOneAndUpdate({email:email},{password:password},{
    new:true,
    runValidators:true
})

    if(resetUser) {
      res.json({success:true})
    } else {
      res.status(404)
      throw new Error('No user was found that matches the information')
    }


})

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  findEmail,
  findPW,
  resetPW
};
