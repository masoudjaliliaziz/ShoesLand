import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import { z } from 'zod'

interface IFormInput {
  username: string
  password: string
}


export default function Auth() {
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
      )
  })
  const { register, handleSubmit, formState, ...other } = useForm<IFormInput>({ defaultValues: { username: 'saeid' }, resolver: zodResolver(schema) })
  console.log(formState)
  console.log(formState.errors)
  console.log(register("username"))

    return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input placeholder='username' {...register("username",
        { required: true, maxLength: 20 })} />
      <p className='text-red-500'>{formState.errors.username?.message}</p>
      <input type="password" placeholder='password' {...register("password", { min: 18, max: 99 })} />
      <p className='text-red-500' >{formState.errors.password?.message}</p>
      <button type="submit" >submit</button>
    </form>
  )
}
