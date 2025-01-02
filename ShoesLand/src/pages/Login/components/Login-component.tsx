import { FC, ReactElement } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { authHooks } from "../../../api/queryClinet";

interface ILoginFormData {
  username: string;
  password: string;
}

export const LoginForm: FC = (): ReactElement => {

  const { mutate } = authHooks.useLogin()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginFormData>();
  return (
    <form onSubmit={(e) => {
      mutate({
        username: '', password: ''
      })
      e.preventDefault();
    }} className="border rounded">
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required",
            }, minLength: {
              value: 3,
              message: "Username must be at least 3 characters long",
            }
          })}
        />
        <p className="text-red-300">{errors.username?.message}</p>
      </div>
      <div>
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
            }
          })}
          name="password"
        />
        <p className="text-red-300">{errors.password?.message}</p>
      </div>
      <button type="submit">Log In</button>
    </form>
  );
};
