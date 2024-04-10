import { useMutation, useQuery } from "@tanstack/react-query";
import { currentUser, loginUser, logoutUser, registerUser } from "../utils/api";
import { TRegisterFormData } from "../pages/Register";
import { TLoginData } from "../pages/Login";
import { QUERY_KEYS } from "./qeryKyes";

const useRegisterUser = () => {
  return useMutation({
    mutationFn: (user: TRegisterFormData) => registerUser(user),
  });
};
const useLoginUser = () => {
  return useMutation({
    mutationFn: (userInfo: TLoginData) => loginUser(userInfo),
  });
};

const useCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CURRENT_USER],
    queryFn: currentUser,
  });
};

const useLogoutUser = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};

export { useRegisterUser, useLoginUser, useCurrentUser, useLogoutUser };
