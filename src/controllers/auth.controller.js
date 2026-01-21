import { User } from "../models/user.model.js";
import { ApiError } from "../utils/Api-Error.js";
import { ApiResponse } from "../utils/Api-Response.js";
const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  const existingUser = await User.findOne({ username: username });

  if (existingUser) {
    throw new ApiError(409, "User will this email or username already exists");
  }
  const user = await User.create({
    username,
    email,
    password,
  });
  const safeUser = await User.findById(user._id).select("-password -_id");
  console.log(safeUser);
  res
    .status(201)
    .json(new ApiResponse(201, safeUser, "User created successfully"));
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "unauthorised user please register");
  }

  const isCorrect = user.isPasswordCorrect(password);
  if (!isCorrect) {
    throw new ApiError(401, "incorrect password");
  }
  const accessToken = user.generateAccessToken();
  console.log(accessToken);
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none", // ✅ MUST for cross-site
    maxAge: 24 * 60 * 60 * 1000,
  };
  const safeUser = await User.findById(user._id).select("-password -_id");
  res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(201, safeUser, "user logged in successfully."));
};
export { registerUser, loginUser };
