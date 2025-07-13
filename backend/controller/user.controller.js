import { User } from "../schemas/userSchema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloud } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

async function generateAccessTokenAndRefreshToken(foundUser, password) {
  const isCorrect = await foundUser.isPasswordCorrect(password);

  if (!isCorrect) throw new ApiError(401, "Invalid credentials");
  
  console.log(foundUser)
  
  const accessToken = await foundUser.generateAccessToken();
  const refreshToken = await foundUser.generateRefreshToken();
  console.log(accessToken)  
  foundUser.refreshToken = refreshToken;
  await foundUser.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
}
async function signup(req, res) {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      throw new ApiError(400, "Username, password, and email are required");
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }]
    });
    
    if (existingUser) {
      throw new ApiError(409, "User with this username or email already exists");
    }

    const user = await User.create({
      username,
      email,
      password
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken -createdAt -updatedAt"
    );

    if (!createdUser) {
      throw new ApiError(500, "Error occurred while creating the user");
    }

    // Generate tokens for the newly created user
    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(
      user,  // Use the newly created user here
      password
    );
    console.log(accessToken,refreshToken)

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(
        { user: createdUser, accessToken, refreshToken }, 
        201, 
        "User registered successfully"
      ));
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors,
        statusCode: error.statusCode
      });
    }
    return res.status(500).json(new ApiError(500, "Internal server error"));
  }
}

async function signin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(
      foundUser,
      password
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    };

    const user = foundUser.toObject();
    delete user.password;
    delete user.refreshToken;
    delete user.createdAt;
    delete user.updatedAt;

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(
        { user, accessToken, refreshToken }, 
        200, 
        "Logged in successfully"
      ));
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors,
        statusCode: error.statusCode
      });
    }
    return res.status(500).json(new ApiError(500, "Internal server error"));
  }
}

async function logout(req, res) {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1
        }
      },
      { new: true }
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    };

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse({}, 200, "User logged out successfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Internal server error"));
  }
}

async function refreshAccessToken(req, res) {
  try {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if (!incomingRefreshToken) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedData = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedData._id);
    if (!user || user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateAccessTokenAndRefreshToken(
      user,
      user.password
    );

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(new ApiResponse({ accessToken }, 200, "Access token refreshed"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message || "Internal server error"));
  }
}

async function updateAvatar(req, res) {
  try {
    if (!req.files?.avatar) {
      throw new ApiError(400, "Avatar file is required");
    }

    const avatarLocalPath = req.files.avatar[0]?.path;
    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required");
    }

    const avatarUrl = await uploadOnCloud(avatarLocalPath);
    if (!avatarUrl) {
      throw new ApiError(500, "Error uploading avatar to cloudinary");
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { avatar: avatarUrl.url } },
      { new: true }
    ).select("-password -refreshToken");

    if (!updatedUser) {
      throw new ApiError(500, "Error updating user avatar");
    }

    return res
      .status(200)
      .json(new ApiResponse(updatedUser, 200, "Avatar updated successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors,
        statusCode: error.statusCode
      });
    }
    return res.status(500).json(new ApiError(500, "Internal server error"));
  }
}

async function getAllUsers(req, res) {
  try {
    const allUsers = await User.find({}).select("-password -refreshToken -email -createdAt -updatedAt");
    
    if (!allUsers) {
      throw new ApiError(500, "Error occurred while fetching users");
    }

    return res
      .status(200)
      .json(new ApiResponse(allUsers, 200, "Users fetched successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message,
        errors: error.errors,
        statusCode: error.statusCode
      });
    }
    return res.status(500).json(new ApiError(500, "Internal server error"));
  }
}

export { signup, signin, logout, refreshAccessToken, updateAvatar, getAllUsers };