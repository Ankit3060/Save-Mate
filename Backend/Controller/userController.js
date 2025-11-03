import { User } from "../Model/userModel.js";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const updateUserDetails = async (req, res) => {
  try {
    const {userId} = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      statusCode: 400,
      success: false,
      message: "Invalid user ID format"
    });
  }

    const { name, phone } = req.body;
    if (!name || !phone) {
      return res.status(400).json({
        statusCode: 400,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "User not found",
      });
    }

    if (name) {
      user.name = name;
    }
    if (phone) {
      const checkPhoneNumber = await User.findOne({
        phone,
        _id: { $ne: userId },
      });
      if (checkPhoneNumber) {
        return res.status(400).json({
          statusCode: 400,
          success: false,
          message: "Phone number already exists",
        });
      }

      const phoneRegex = /^(?!(\d)\1{9})[6-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({
          statusCode: 400,
          success: false,
          message:
            "Phone number must be 10 digits long and start with 6, 7, 8, or 9 and cannot be all the same digit",
        });
      }

      user.phone = phone;
    }
    await user.save();

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "User details updated successfully",
      user
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      error: error.message,
    });
  }
};



export const updatePassword = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "User ID is required",
      });
    }
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Old password and new password are required",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#_.-])[A-Za-z\d@$!%*?&^#_.-]{6,20}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message:
          "Password must be 6-20 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "New password and confirm new password do not match",
      });
    }

    const user = await User.findById(userId).select("+password");
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      error: error.message,
    });
  }
};




export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({ accountVerified: true })
      .select("-password -verificationCode -verificationCodeExpires -otpGenerated -lastOtpTime")
      .skip(skip)
      .limit(limit);
    
    return res.status(200).json({
      statusCode: 200,
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      success: false,
      error: error.message,
    });
  }
};




export const getCurrentUser = async (req, res) => {
    try {
        return res.status(200).json({
            statusCode: 200,
            success: true,
            user: req.user,
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            error: error.message,
        });
    }
}



export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                statusCode: 400,
                success: false,
                message: "User ID is required",
            });
        }

        const user = await User.findById(id).select("-password -verificationCode -verificationCodeExpires -otpGenerated -lastOtpTime");
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            statusCode: 200,
            success: true,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            success: false,
            error: error.message,
        });
    }
}