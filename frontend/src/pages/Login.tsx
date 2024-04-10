import { Link, useNavigate } from "react-router-dom";
import { userLoginSchema } from "../utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useLoginUser } from "../react-query/queries";
import toast from "react-hot-toast";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
export type TLoginData = z.infer<typeof userLoginSchema>;
const Login = () => {
  const { isLoggedIn, setLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();
  const { mutateAsync: loginUser, error } = useLoginUser();
  const errorMessage = error?.message;
  // console.log(errorMessage);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TLoginData>({
    resolver: zodResolver(userLoginSchema),
  });
  const onSubmit = async (data: TLoginData) => {
    console.log(data);
    try {
      const result = await loginUser(data);
      console.log(result);
      if (result?.statusCode === 200) {
        toast.success("Logged in successfully");
        reset();
        setLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      toast.error(errorMessage || "something went wrong");
    }
  };
  return (
    <form
      className="h-full w-full flex justify-center items-center pt-8 md:pt-12"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="shadow-md rounded-lg flex px-6 md:px-10 flex-col border-[1px] border-rose-500 pb-4">
        <div className="text-center w-full border-b-[1px] border-neutral-200 py-4">
          <h3 className="text-2xl font-bold text-rose-500">Login</h3>
          <p className="font-semibold text-lg text-black">
            Login to Your Account
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full pb-8">
          <div className="flex flex-col">
            <label htmlFor="email" className="input_label">
              email
            </label>
            <input
              type="text"
              id="email"
              placeholder="enter a valid email..."
              className={`input_filed`}
              {...register("email")}
            ></input>
            {errors.email ? (
              <p className="text-rose-500">{errors.email.message}</p>
            ) : null}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="input_label">
              password
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              className="input_filed"
              {...register("password")}
            ></input>
            {errors.password ? (
              <p className="text-rose-500">{errors.password.message}</p>
            ) : null}
          </div>
        </div>
        <div className="flex justify-center w-full flex-col items-center gap-2">
          <p className="text-lg">
            Don't have an account?
            <Link to="/auth/register" className="underline text-blue-400">
              register here
            </Link>
          </p>
          <button
            className="bg-rose-500 text-white font-semibold text;lg p-4 w-full rounded-xl"
            disabled={isSubmitting}
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default Login;
