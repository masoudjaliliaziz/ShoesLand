import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Navigate } from "react-router-dom";

interface ISignInProps {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  confPassword: string;
  selectGender: "male" | "female" | "other";
  phonenumber: string;
}

export default function SingIN() {
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
    selectGender: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ISignInProps>({ resolver: zodResolver(schema) });

  return (
    <div>
      <div>
        <svg
          onClick={() => Navigate(-1)}
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
      <div>
        <img src="../img/Vector1.png" alt="" />
        <span>Let’s To Create Account</span>
      </div>
      <div>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
            {/* usernamefiled */}
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <input placeholder="Username" {...register }/>
          </div>
          {/* emailfield */}

          {/* firstname */}
          <div> 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <input placeholder="Username" />
          </div>
          {/* lastname */}
          <div> 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>

            <input placeholder="Username" />
          </div>
        </form>
      </div>
    </div>
  );
}
