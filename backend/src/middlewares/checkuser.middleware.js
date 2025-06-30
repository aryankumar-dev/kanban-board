import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

const isLoggedIn = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    console.log(`accessToken = ${accessToken}, refreshToken = ${refreshToken}`);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",  // Correct environment check
      sameSite: "None",
    };


    if (!accessToken) {
      console.log("if");
      if (!refreshToken) {


        return res.status(401).json({
          status: false,
          message: "Unauthorized access hai bahi",
        });
      }

      // ✅ VERIFY REFRESH TOKEN
      const refreshDecoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const user = await User.findOne({ _id: refreshDecoded._id });



      console.log("Refresh Token from cookie:", refreshToken);
      console.log("User refresh token from DB:", user ? user.refreshToken : null);
      console.log("User from DB:", user);

      if (!user || user.refreshToken !== refreshToken) {
        return res.status(401).json({
          status: false,
          message: "Unauthorized access",
        });
      }

      // ✅ GENERATE NEW TOKENS
      const newAccessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      });
      const newRefreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      });

      user.refreshToken = newRefreshToken;
      await user.save();

      res.cookie("accessToken", newAccessToken, cookieOptions);
      res.cookie("refreshToken", newRefreshToken, cookieOptions);

      req.user = user;
      return next();
    } else {
      console.log("else");
      // ✅ VERIFY ACCESS TOKEN
      const accessDecoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      console.log("Decoded access token:", accessDecoded);
      const user = await User.findOne({ _id: accessDecoded.id }); // ✅ FIXED HERE

      if (!user) {

        return res.status(401).json({
          status: false,
          message: "Unauthorized access aa gya sier",
        });
      }

      // ✅ GENERATE NEW TOKENS
      const newAccessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      });
      const newRefreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      });

      user.refreshToken = newRefreshToken;
      await user.save();

      res.cookie("accessToken", newAccessToken, cookieOptions);
      res.cookie("refreshToken", newRefreshToken, cookieOptions);

      req.user = user;
      return next();
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export default isLoggedIn;
