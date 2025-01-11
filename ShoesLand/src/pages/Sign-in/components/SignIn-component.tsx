import { zodResolver } from "@hookform/resolvers/zod";

import { IoMdArrowRoundBack } from "react-icons/io";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Link, Navigate, useNavigate } from "react-router-dom";

interface ISignInProps {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  confPassword: string;
  gender: "male" | "female" | "other";
  phonenumber: string;
}

export default function SingUp() {
  const navigate = useNavigate()
  const schema = z.object({
    password: z
      .string()
      .min(8, "Password must have at least 8 characters")
      .max(16, "Password must have at most 16 characters")
      .regex(
        /[A-Za-z0-9!@#$]/,
        "Password must contain at least one alphanumeric character or special symbol (!@#$)"
      ),
    username: z
      .string()
      .min(5, "Username must have at least 5 characters")
      .regex(
        /^[A-Z][A-Za-z0-9]*$/,
        "Username must start with an uppercase letter and contain only alphanumeric characters"
      ),
    email: z
      .string()
      .email("Email is not correct")
      .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    firstname: z.string().regex(/^[a-zA-Z]{3,}$/),
    lastname: z.string().regex(/[a-zA-Z]{3,}/),
    phonenumber: z.string().regex(/^(\+98|0)?9\d{9}$/),
    confPassword: z
      .string()
      .min(8, "Password must have at least 8 characters")
      .max(16, "Password must have at most 16 characters")
      .regex(
        /[A-Za-z0-9!@#$]/,
        "Password must contain at least one alphanumeric character or special symbol (!@#$)"
      ),
    gender: z.string().trim().nonempty({ message: "Gender is required" }),
    acceptTerms: z.literal(true, {
      errorMap: () => ({
        message: "I have read and accept the User Aggrement and Privacy Policy",
      }),
    }),
  });

  const genderOptions = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ISignInProps>({ resolver: zodResolver(schema) });


  return (
    <div className="flex flex-col h-screen">
      <button onClick={() => navigate(-1)}>

        <IoMdArrowRoundBack className="w-9 h-9 ml-2 mt-2" />
      </button>
      <div className="flex flex-col justify-center items-center gap-6 pt-16 mb-10">
        <img src="../img/Vector1.png" alt="" />
        <span className="text-3xl font-bold ">Let’s To Create Account</span>
      </div>
      <div>
        <form onSubmit={handleSubmit((data) => console.log(data))} className='px-8' >
          {/* usernamefiled */}
          <div className="flex gap-2 items-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: true, maxLength: 20 })}
            />
          </div>
          {/* emailfield */}
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

            <input
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </div>
          {/* firstname and last name */}
          <div className="flex">
            {/* firstname */}
            <div className="flex w-1/2 gap-2 items-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>

              <input
                className="w-1/2"
                placeholder="First name"
                {...register("firstname", { required: true, minLength: 3 })}
              />
            </div>
            {/* lastname */}
            <div className="flex w-1/2 gap-2 items-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>

              <input
                className="w-1/2"
                placeholder="Last name"
                {...register("lastname", { required: true, minLength: 3 })}
              />
            </div>
          </div>
          {/* password */}
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
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true, minLength: 8 })}
            />
          </div>
          {/* confirm password */}
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
            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confPassword", { required: true, minLength: 8 })}
            />
          </div>
          {/* gender and phonenumber */}
          <div className="flex gap-2 items-center mb-6">
            <div className="flex w-1/2 gap-2 items-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
              </svg>
              <select className="w-1/2" {...register("gender")}>
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* phonenumber */}
            <div className="flex w-1/2 gap-2 items-center mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                type="text"
                placeholder="Phonenumber"
                className="w-full"
                {...register("phonenumber", { required: true, maxLength: 11 })}
              />
            </div>
          </div>
          {/* checkbox */}
          <div className="flex gap-2 items-center mb-6">
            <input
              type="checkbox"
              {...register("acceptTerms")}
              className={`rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${errors.acceptTerms ? "border-red-500" : ""
                }`}
            />
            <span className="text-base font-semibold">
              I have read and accept the User Agreement and Privacy Policy
            </span>
          </div>
          <div className="flex justify-center items-center">
            <button

              className="bg-black cursor-pointer text-xl w-[350px] py-2 text-white rounded-2xl"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="flex mt-4 items-center gap-4 justify-center">
          <p className="text-base font-semibold text-gray-500">Already have an account?</p>

          <p onClick={() => navigate('/login')} className="text-lg text-black font-semibold w-1/3">Log In</p>
        </div>
      </div>
    </div>
  );
}
