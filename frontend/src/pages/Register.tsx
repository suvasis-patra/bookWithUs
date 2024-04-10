import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { userSchema } from "../utils/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRegisterUser } from "../react-query/queries";
import toast from "react-hot-toast";
export type TRegisterFormData = z.infer<typeof userSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync: registerUser, error } = useRegisterUser();
  const errorMessage = error?.message;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterFormData>({ resolver: zodResolver(userSchema) });
  const onSubmit = async (data: TRegisterFormData) => {
    try {
      const result = await registerUser(data);
      console.log(result);
      if (result?.statusCode === 200) {
        toast.success("Registered successfully");
        reset();
        navigate("/auth/login");
      }
    } catch (error) {
      toast.error(errorMessage || "something went wrong");
    }
  };
  return (
    <form
      className="h-full w-full flex justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="shadow-md rounded-lg flex px-6 md:px-10 flex-col border-[1px] border-rose-500 pb-4">
        <div className="text-center w-full border-b-[1px] border-neutral-200 py-4">
          <h3 className="text-2xl font-bold text-rose-500">Register</h3>
          <p className="font-semibold text-lg text-black">
            Create a new Account
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full pb-8">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex flex-col">
              <label htmlFor="firstname" className="input_label">
                firstname
              </label>
              <input
                type="text"
                id="firstname"
                placeholder="firstname..."
                className="input_filed"
                {...register("firstname")}
              ></input>
              {errors.firstname ? (
                <p className="text-rose-500">{errors.firstname.message}</p>
              ) : null}
            </div>
            <div className="flex flex-col">
              <label htmlFor="lastname" className="input_label">
                lastname
              </label>
              <input
                type="text"
                id="lastname"
                placeholder="lastname..."
                className="input_filed"
                {...register("lastname")}
              ></input>
              {errors.lastname ? (
                <p className="text-rose-500">{errors.lastname.message}</p>
              ) : null}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="input_label">
              email
            </label>
            <input
              type="email"
              id="email"
              placeholder="enter a valid email..."
              className="input_filed"
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
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="input_label">
              confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="confirm password..."
              className="input_filed"
              {...register("confirmPassword")}
            ></input>
            {errors.confirmPassword ? (
              <p className="text-rose-500">{errors.confirmPassword.message}</p>
            ) : null}
          </div>
        </div>
        <div className="flex justify-center w-full flex-col items-center gap-2">
          <p className="text-lg">
            already have an account?
            <Link to="/auth/login" className="underline text-blue-400">
              login here
            </Link>
          </p>
          <button
            className="bg-rose-500 text-white font-semibold text;lg p-4 w-full rounded-xl hover:bg-rose-700"
            disabled={isSubmitting}
          >
            Signup
          </button>
        </div>
      </div>
    </form>
  );
};

export default Register;
