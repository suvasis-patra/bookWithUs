import axios, { AxiosError } from "axios";
import { TRegisterFormData } from "../pages/Register";
import { TLoginData } from "../pages/Login";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const apiRequestHandler = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const registerUser = async (user: TRegisterFormData) => {
  try {
    const response = await apiRequestHandler.post("/user/register", user);
    console.log(response?.data);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error);
    }
  }
};

const loginUser = async (userInfo: TLoginData) => {
  try {
    const response = await apiRequestHandler.post("/user/login", userInfo);
    console.log(response?.data);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    }
  }
};

const currentUser = async () => {
  try {
    const response = await apiRequestHandler.get("/user/current-user");
    return response.data;
  } catch (error) {
    console.log("something went wrong,failed to get user info", error);
    return null;
  }
};

const logoutUser = async () => {
  try {
    const response = await apiRequestHandler.get("/user/logout");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message);
    }
  }
};

export { registerUser, loginUser, currentUser, logoutUser };
