import { ApiResponse } from "../utils/Api-Response.js";
const getCurrentUser = (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      req.user,
      "Current user fetched successfully"
    )
  );
};
export default getCurrentUser;