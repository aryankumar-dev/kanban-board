import { asyncHandler } from "../utils/async-handler.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { User } from "../models/user.models.js";
import { sendEmail, emailVerificationMailgenContent } from "../utils/mail.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, role, fullName } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
   return res.status(400).json(new ApiResponse(400, null, "User already exists"));

  }

  // Create new user instance
  const user = new User({ email, username, password, role, fullName });

  // Generate verification token
  const { unHashedToken, hashedToken, tokenExpiry } = user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  // Save user to database
  await user.save();

  // Prepare verification email URL
  const verificationUrl = `${process.env.FRONTEND_BASE_URL}/verifyEmail/${hashedToken}`;

  // Send verification email
  await sendEmail({
    email: user.email,
    subject: "Verify your email",
    mailgenContent: emailVerificationMailgenContent(user.username, verificationUrl),
  });

  // Respond with success
  res.status(201).json(new ApiResponse(201, {
    message: "User created successfully. Verification email sent.",
    user,
  }));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
     return res.status(400).json(
      new ApiError(400, "User does not exist", [{ failed: true }])
    );
  
  }

   const isPasswordMatch = await user.isPasswordCorrect(password);
  if (!isPasswordMatch) {
    return res.status(400).json(
      new ApiError(400, "Pawwword not Matched", [{ failed: true }])
    );
  }



  if (!user.isEmailVerified) {

    return res.status(400).json(
      new ApiError(400, "Email not verified", [{ failed: true }])
    );

  }

 
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",  // Correct environment check
  sameSite: "None",
};


  // res.cookie("jwtToken", jwtToken, cookieOptions);
  res.cookie("aceessToken", accessToken, cookieOptions);
  res.cookie("refreshToken", refreshToken, cookieOptions);

  return res.status(200).json(new ApiResponse(200, {
    message: "Login successful.",
    user,
    success: true,
  }));
});


const logoutUser = asyncHandler(async (req, res) => {
  // Optional: Clear refresh token from DB
  const userId = req.user?._id;
  if (userId) {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
  }

  // Clear cookies
  res.clearCookie("accessToken", { httpOnly: true });
  res.clearCookie("refreshToken", { httpOnly: true });

  return res.status(200).json({
    status: true,
    message: "Logged out successfully.",
  });
});


const verifyEmail = asyncHandler(async (req, res) => {
  const token = req.params.token;

  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpiry: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400).json(new ApiResponse(400, {
      message: "User created successfully. Verification email sent.",
    }));
  }

  user.isEmailVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpiry = undefined;
  await user.save();

  res.status(201).json(new ApiResponse(201, {
    message: "User is Verified",

  }));

  //validation
});



const resendEmailVerification = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;


});
const resetForgottenPassword = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;


});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { email, username, password, role } = req.body;

  //validation
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (userId) {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
  }

  const userdata = await User.findById(userId);
  return res.status(200).json({
    status: true,
    message: "User is ", userdata
  });

});



const getCurrentUserbyid = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({
      status: false,
      message: "User ID is required"
    });
  }

  const userdata = await User.findById(userId).select('-password');

  if (!userdata) {
    return res.status(404).json({
      status: false,
      message: "User not found"
    });
  }

  return res.status(200).json({
    status: true,
    message: "User found",
    userdata
  });
});


export {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgottenPassword,
  verifyEmail,
  getCurrentUserbyid,
};
