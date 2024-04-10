import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ErrorResponse";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";
const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log(req.cookies);
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log("token is:", token);
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodeToken = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    const user = await User.findById(decodeToken.id);
    // console.log(user);
    if (!user) throw new ApiError(401, "invalid token");
    req.headers["userId"] = user?._id;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      res
        .status(error.statusCode)
        .json({ message: error.message || "Internal server error" });
    }
  }
};

export { userAuth };
