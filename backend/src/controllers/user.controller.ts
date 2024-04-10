import { userDetailSchema, userLoginSchema } from "../utils/validation";
import { ApiError } from "../utils/ErrorResponse";
import { User } from "../models/user.model";
import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { Tokens } from "../utils/types";
import { z } from "zod";
const generateAccessAndRefreshToken = async (
  userId: string
): Promise<Tokens | undefined> => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(400, "user not found");
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("something went wrong,Failed to generate tokens", error);
  }
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const body: z.infer<typeof userDetailSchema> = req.body;
    const result = userDetailSchema.safeParse(req.body);
    if (!result.success) {
      throw new ApiError(400, "Invalid user input");
    }
    const { email, firstname, lastname, password } = body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new ApiError(401, "User already exist");
    }
    const newUser = new User({ email, firstname, lastname, password });
    const user = await newUser.save();
    if (!user) {
      throw new ApiError(500, "Failed to register user");
    }
    res
      .status(200)
      .send(new ApiResponse(200, { id: user._id }, "successfully registered"));
  } catch (error) {
    if (error instanceof ApiError) {
      res
        .status(error.statusCode || 500)
        .send({ error: error.message || "Internal server error" });
    }
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const body: z.infer<typeof userLoginSchema> = req.body;
    const result = userLoginSchema.safeParse(body);
    if (!result.success) {
      throw new ApiError(400, "Invalid user input");
    }
    const { email, password } = body;
    const findUser = await User.findOne({ email });
    if (!findUser) throw new ApiError(401, "Invalid Credentials");
    const checkPassword = await findUser.isPasswordCorrect(password);
    if (!checkPassword) throw new ApiError(401, "Invalid credentials");
    const tokens = await generateAccessAndRefreshToken(findUser._id);
    if (!tokens) throw new ApiError(500, "Failed to generate tokens");
    const { accessToken, refreshToken } = tokens;
    const user = await User.findById(findUser._id).select(
      "-password -refreshToken"
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .send(
        new ApiResponse(
          200,
          { user, accessToken, refreshToken },
          "user loggedin successfully"
        )
      );
  } catch (error) {
    if (error instanceof ApiError) {
      res
        .status(error.statusCode || 500)
        .json({ message: error.message || "Internal server error" });
    }
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  const userId = req.headers["userId"];
  // console.log(userId, req.headers);
  if (!userId) throw new ApiError(400, "Access denied");
  try {
    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) throw new ApiError(401, "user not found");
    return res
      .status(200)
      .send(new ApiResponse(200, user, "user found succcessfully"));
  } catch (error: any) {
    if (error instanceof ApiError) {
      res
        .status(error.statusCode || 500)
        .json({ message: error.message || "Internal server error" });
    }
  }
};

const logoutUser = async (req: Request, res: Response) => {
  try {
    const userId = req.headers["userId"];
    console.log("user id is :", userId);
    if (!userId) throw new ApiError(400, "Access denied");
    await User.findByIdAndUpdate(
      userId,
      { $unset: { refreshToken: 1 } },
      { new: true }
    );

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .send(new ApiResponse(200, {}, "user logged out successfully"));
  } catch (error) {
    if (error instanceof ApiError) {
      res
        .status(error.statusCode)
        .json({ message: error.message || "Internal server error" });
    }
  }
};

export { registerUser, loginUser, logoutUser, getCurrentUser };
