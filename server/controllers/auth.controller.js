import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

export const signUp = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await mongoose.model("User").findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: "false",
        message: "User with this email already registered",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        newUser,
      },
    });
  } catch (error) {
    next(error);
  }
};
