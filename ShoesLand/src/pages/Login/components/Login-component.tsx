import { FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authHooks } from "../../../api/queryClinet";
import { useDispatch } from "react-redux";
import { setToken } from "../../../config/slice";
import { IoMdArrowRoundBack } from "react-icons/io";
import Username from "../../../assets/Username.svg";
import pass from "../../../assets/pass.svg";
import eyeSlash from "../../../assets/EyeSlash.svg";
import Cookies from "js-cookie";
import clsx from "clsx";

interface ILoginFormData {
  username: string;
  password: string;
}

export const LoginForm: FC = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate } = authHooks.useLogin();
  const onSubmit = (data: ILoginFormData) => {
    try {
      console.log(data);
      mutate(data, {
        onSuccess: (response) => {
          console.log(response);
          if (response?.accessToken) {
            dispatch(setToken(response.accessToken));

            alert('Loged in successful!');
            navigate("/");
          } else {
            console.error("Failed to login, no accessToken in response");
          }
        },
      });
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginFormData>();
  return (
    <div className="flex flex-col h-screen px-5 w-full relative ">
      {/* ArrowRoundBack icon */}
      <div>
        <button onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack className="size-9 absolute top-1 left-3 font-bold" />
        </button>
      </div>
      <div className="flex flex-col justify-center items-center gap-6 h-1/3 ">
        <img src="../img/Vector1.png" alt="logo" className="w-10" />
      </div>
      <span className="text-3xl font-bold pb-9 text-center text-black">
        Login to Your Account
      </span>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div
          className={clsx(
            "flex gap-2 items-center w-full bg-gray-100 py-1 px-2 rounded flex-col",
            !errors.username?.message ? "mb-5" : "mb-0"
          )}
        >
          <div className="flex items-center space-x-1 w-full">
            <img
              src={Username}
              alt="Username"
              className="size-4 color-[#6C757D]"
            />
            <input
              className="bg-transparent w-[90%] outline-none focus:bg-transparent"
              style={{
                WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                WebkitTextFillColor: "inherit",
                transition: "background-color 5000s ease-in-out 0s",
              }}
              placeholder="Username"
              type="text"
              id="username"
              {...register("username", {
                required: {
                  value: true,
                  message: "Username is required",
                },
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters long",
                },
              })}
            />
          </div>
        </div>
        <p className="text-rose-500 font-semibold text-sm px-3">
          {errors.username?.message}
        </p>
        <div
          className={clsx(
            "flex gap-2 items-center bg-gray-100 py-1 px-2 rounded flex-col",
            !errors.password?.message ? "mb-5" : "mb-0"
          )}
        >
          <div className="flex items-center space-x-1 w-full">
            <img src={pass} alt="pass" className="size-4 color-[#6C757D]" />
            <input
              className="bg-transparent w-[90%] outline-none focus:bg-transparent"
              style={{
                WebkitBoxShadow: "0 0 0px 1000px transparent inset",
                WebkitTextFillColor: "inherit",
                transition: "background-color 5000s ease-in-out 0s",
              }}
              placeholder="Password"
              type="password"
              id="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "Password is required",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 char",
                },
                maxLength: {
                  value: 16,
                  message: "Password must be at most 16 char",
                },
              })}
              name="password"
            />
            <button>
              <img src={eyeSlash} alt="show password" className="w-4" />
            </button>
          </div>
        </div>
        <p className="text-rose-500 font-semibold text-sm px-3">
          {errors.password?.message}
        </p>
        <div className="flex justify-between font-semibold text-sm px-1">
          <div className="space-x-1">
            <input
              type="checkbox"
              name="rememberme"
              id="rememberme"
              className="text-white rounded-full accent-slate-950"
            />
            <label htmlFor="rememberme">Remember me</label>
          </div>
          <button className="transition-all duration-300 hover:text-slate-500">
            <p>Forget Password?</p>
          </button>
        </div>
        <div className="absolute bottom-3 flex flex-col justify-center items-center space-y-2">
          <div className="flex justify-center items-center">
            <button className="bg-gray-600 cursor-pointer text-sm font-semibold w-[350px] py-2 text-white rounded-2xl">
              Sign In
            </button>
          </div>
          <div className="flex items-center content-center justify-between w-[80%]">
            <p className="text-sm font-semibold text-gray-500">
              Don’t have an account?
            </p>
            <p onClick={() => navigate('/signup')} className="text-sm text-black font-semibold w-1/3 cursor-pointer ">
              Register Now
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};
