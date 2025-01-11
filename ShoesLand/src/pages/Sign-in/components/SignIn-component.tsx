import { zodResolver } from "@hookform/resolvers/zod";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../component/base/FormInput";
import { authHooks } from "../../../api/queryClinet";
import { useDispatch } from "react-redux";
import { setToken } from "../../../config/slice";

interface ISignInProps {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  confPassword: string;
  gender: "male" | "female" | "other";
  phonenumber: string;
  acceptTerms: boolean;
}

export default function SignUp() {
  const navigate = useNavigate();

  const schema = z.object({
    username: z
      .string()
      .min(5, "Username must have at least 5 characters")
      .regex(
        /^[A-Z][A-Za-z0-9]*$/,
        "Username must start with an uppercase letter and contain only alphanumeric characters"
      ),
    email: z.string().email("Invalid email address"),
    firstname: z.string().min(3, "First name must have at least 3 characters"),
    lastname: z.string().min(3, "Last name must have at least 3 characters"),
    password: z
      .string()
      .min(8, "Password must have at least 8 characters")
      .max(16, "Password must have at most 16 characters")
      .regex(
        /[A-Za-z0-9!@#$]/,
        "Password must contain alphanumeric characters or special symbols (!@#$)"
      ),
    confPassword: z.string().min(8, "Confirm password must match"),
    gender: z.enum(["male", "female", "other"], {
      required_error: "Gender is required",
    }),
    phonenumber: z.string().regex(/^(\+98|0)?9\d{9}$/, "Invalid phone number"),
    acceptTerms: z.literal(true, {
      errorMap: () => ({
        message: "You must accept the terms and conditions",
      }),
    }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInProps>({ resolver: zodResolver(schema) });

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const { mutate } = authHooks.useSignup()
  const dispatch = useDispatch()

  const onSubmit = (data: ISignInProps) => {
    try {
      console.log(data);
      mutate(data, {
        onSuccess: (response) => {
          console.log(response);
          if (response?.accessToken) {
            alert('Sign up successful!');
            dispatch(setToken(response.accessToken));

            navigate("/login");

          } else {
            console.error("Failed to login, no accessToken in response");
          }
        },
      });
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="flex flex-col h-screen px-5 m-auto">
      <button onClick={() => navigate(-1)} className="mt-2">
        <IoMdArrowRoundBack className="w-9 h-9 ml-2" />
      </button>
      <div className="flex flex-col justify-center items-center gap-6 pt-20 mb-8">
        <img src="../img/Vector1.png" alt="Logo" />
        <span className="text-3xl font-bold my-10">Let’s Create Your Account</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          id="username"
          placeholder="Username"
          register={register}
          validationRules={{
            required: "Username is required",
          }}
          errors={errors}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
          }
        />
        <FormInput
          id="email"
          placeholder="Email"
          register={register}
          validationRules={{
            required: "Email is required",
          }}
          errors={errors}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4 color-[#6C757D]"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
          }
        />
        <div className='flex gap-[10%]'>
          <div className='w-[45%]'>
            <FormInput
              id="firstname"
              placeholder="First Name"
              register={register}
              validationRules={{
                required: "First name is required",
              }}
              errors={errors}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
              }
            />
          </div>
          <div className='w-[45%]'>
            <FormInput
              id="lastname"
              placeholder="Last Name"
              register={register}
              validationRules={{
                required: "Last name is required",
              }}
              errors={errors}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-4"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
              }
            />
          </div>
        </div>
        <FormInput
          id="password"
          type="password"
          placeholder="Password"
          register={register}
          validationRules={{
            required: "Password is required",
          }}
          errors={errors}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
        <FormInput
          id="confPassword"
          type="password"
          placeholder="Confirm Password"
          register={register}
          validationRules={{
            required: "Confirm password is required",
          }}
          errors={errors}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
        <div className="flex gap-4">
          <div className="flex flex-col w-1/2">
            <select
              {...register("gender")}
              className="bg-gray-100 rounded p-2"
            >
              <option value="">Select Gender</option>
              {genderOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.gender && (
              <p className="text-rose-500 text-sm">{errors.gender.message}</p>
            )}
          </div>
          <FormInput
            id="phonenumber"
            placeholder="Phone Number"
            register={register}
            validationRules={{
              required: "Phone number is required",
            }}
            errors={errors}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                  clipRule="evenodd"
                />
              </svg>
            }
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register("acceptTerms")}
            className="w-5 h-5"
          />
          <span className="text-gray-600 text-sm">
            I accept the Terms and Privacy Policy
          </span>
        </div>
        {errors.acceptTerms && (
          <p className="text-rose-500 text-sm">{errors.acceptTerms.message}</p>
        )}
        <button
          type="submit"
          className="bg-black text-white py-2 px-6 rounded w-full mt-4"
        >
          Sign Up
        </button>
      </form>
      <div className="flex justify-center mt-6">
        <span className="text-gray-500">Already have an account?</span>
        <button
          onClick={() => navigate("/login")}
          className="text-blue-500 ml-2"
        >
          Log In
        </button>
      </div>
    </div>
  );
}

