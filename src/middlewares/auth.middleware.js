import jwt from "jsonwebtoken";
import { ApiError } from "../utils/Api-Error.js";
import { User } from "../models/user.model.js";

const verifyJWT = async(req, res, next) => {
  const token = req.cookies?.accessToken;
  console.log(token);
  if (!token) {
    throw new ApiError(401, "AccessToken missing");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decodedToken)
    const user = await User.findById(decodedToken._id);

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid access Token");
  }
};
export { verifyJWT };
