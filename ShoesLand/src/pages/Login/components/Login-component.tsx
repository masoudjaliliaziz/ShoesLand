import { FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { authHooks } from "../../../api/queryClinet";
import { useDispatch } from "react-redux";
import { setToken } from "../../../config/slice";

import Cookies from "js-cookie"

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
            console.log("ok");
            dispatch(setToken(response.accessToken));

            console.log(Cookies.get())
            // navigate("/");
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
    <div className="flex flex-col h-screen">
      {/* backward icon */}
      <div>
        <svg
          onClick={() => navigate(-1)}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-7 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h15"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-center items-center gap-6 pt-16 mb-10">
        <img src="../img/Vector1.png" alt="" />
        <span className="text-3xl font-bold ">Login to Your Account</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex gap-2 items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4 color-[#6C757D]"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <label htmlFor="username">Username:</label>
          <input
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
          <p className="text-red-300">{errors.username?.message}</p>
        </div>
        <div className="flex gap-2 items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
          >
            <path
              fill-rule="evenodd"
              d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z"
              clip-rule="evenodd"
            />
          </svg>
          <label htmlFor="password">Password:</label>
          <input
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
          <p className="text-red-300">{errors.password?.message}</p>
        </div>
        <div className="flex justify-center items-center">
          <button className="bg-black cursor-pointer text-xl w-[350px] py-2 text-white rounded-2xl">
            Log In
          </button>
        </div>
      </form>
      <div className="flex mt-4 items-center gap-4 justify-center">
        <p className="text-base font-semibold text-gray-500">
          Don’t have an account?
        </p>
        <a href="#" className="text-lg text-black font-semibold w-1/3">
          Register Now
        </a>
      </div>
    </div>
  );
};
