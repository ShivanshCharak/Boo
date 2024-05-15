import { User } from "../schemas/userSchema.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloud } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";

async function generateAccessTokenAndRefreshToken(foundUser, _, password) {
  const isCorrect = await foundUser.isPasswordCorrect(password);

  if (!isCorrect) throw new ApiError(401, "Check credentials");
  const accessToken = await foundUser.generateAccessToken();
  const refreshToken = await foundUser.generateRefreshToken();

  return { accessToken, refreshToken };
}

async function signup(req, res) {
  const { username, password, email } = req.body;

  if ([username, password, email].some((field) => field === "")) {
    return new ApiError(401, "username, Password, Email are required");
  }

  const isFound = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });
  if (isFound) {
    throw new ApiError(404, "User already exists");
  }

  const user = await User.create({
    username,
    email,
    password,
  });
  const createdUser = await User.findById(user?._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(404, "Error occurred while saving the user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
}
async function signin(req, res) {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if ([email, password].some((field) => field === ""))
      throw new ApiError(401, "Invalid username and password line-no:7");
    let foundUser = await User.findOne({ email });
    if (!foundUser) throw new ApiError(401, "Check credentials");
    const { accessToken, refreshToken } =
      await generateAccessTokenAndRefreshToken(foundUser, email, password);
    const options = {
      httpOnly: true,
      secure: true,
    };
    foundUser = foundUser.toObject();
    delete foundUser.createdAt;
    delete foundUser.updatedAt;
    delete foundUser.password;
    const user = { ...foundUser, refreshToken, accessToken };
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse({ user: user }, 200, "Logged in successfully"));
  } catch (error) {
    throw new ApiError(
      400,
      error.message,
      "Something went wrong while signining on line 71"
    );
  }
}
async function logout(req, res) {
  const updated = await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", new Date().getSeconds(), options)
    .cookie("refreshToken", new Date().getSeconds(), options)
    .json(200, {}, "User loggedout successfully");
}
async function refreshAccessToken() {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(400, "No refreshToken found line no 93");
  }
  const decodedData = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  if (!decodedData) throw new ApiError(400, "invalid refrsh token ");
  const foundedUser = User.findById(decodedData._id);
}
async function updateAvatar(req, res) {
  try {
    const avatarLocalPath = req.files?.avatar[0]?.path; // if the filename is avatar
    console.log(avatarLocalPath);
    if (!avatarLocalPath) throw new ApiError(400, "The Avatar was provided");

    const avatarUrl = await uploadOnCloud(avatarLocalPath);
    if (!avatarUrl)
      throw new ApiError(
        500,
        "Error has occured while uploadin image on cloudinary"
      );
    const foundedUser = await User.findByIdAndUpdate(req.user._id, {
      $set: { avatar: avatarUrl.url },
    });
    if (!foundedUser)
      throw new ApiError(500, "Error has occured while saving the file in DB");

    console.log(foundedUser);
    res.status(200).send(200, "SuccessFully saved the avatar");
  } catch (error) {
    throw new ApiError(
      500,
      error.message,
      "Something happened while updating the Avatar"
    );
  }
}

async function getAllUsers(_,res){
  console.log("hey")
  const allUser  = await User.find({}).select("-password -email -createdAt -updatedAt")
  if(!allUser) throw new ApiError(500,"Error occured while fetching data")
    res.json(new ApiResponse(allUser,200,"Successfully fetched all users"))
}

export { signup, signin, logout, updateAvatar,getAllUsers };
