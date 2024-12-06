import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const loginSchema = z.object({
    username: z.string().min(5, "نام کاربری باید حداقل 5 کاراکتر باشد")
    .regex(/^[a-zA-Z][a-zA-Z0-9]*$/, "نام کاربری با حرف بزرگ شروع شود و شامل حروف و اعداد باشد"),
    password: z.string().min(8, "رمز عبور باید حداقل 8 کاراکتر باشد")
    .max(16, "رمز عبور نمی تواند بیش از 16 کاراکتر باشد")
    .regex(/[!@#$]/, "رمز عبور باید شامل یکی از کاراکترهای $#@! باشد")
    .regex(/[a-zA-Z]/, "رمز عبور باید شامل حروف باشد.")
    .regex(/\d/, "رمز عبور باید شامل اعداد باشد."),
});

type LoginForm = z.infer<typeof loginSchema>;

function Validation (){
    const [isLocked, setIsLocked] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        });
    
    useEffect(()=>{
        const lockTime  = localStorage.getItem("localTime");
        if(lockTime){
            const lockDuration = 5*60*1000;
            const timePassed = Date.now() - parseInt(lockTime, 10);
            if(timePassed < lockDuration){
                setIsLocked(true);
                setTimeLeft(Math.cell((lockDuration - timePassed)/1000))
            }else{
                localStorage.removeItem("localTime");
                localStorage.removeItem("failedAttempts");
            }
        }
    }, [])
    useEffect(()=>{
        let timer: Number;
        if(isLocked && timeLeft > 0){
            timer = setInterval(()=>{
                setTimeLeft((prev)=>{
                    if(prev<=1){
                        setIsLocked(false)
                        localStorage.removeItem("localTime");
                        localStorage.removeItem("failedAttempts");
                        return 0;
                    }
                    return prev -1;
                });
            }, 1000);
        }
        return ()=> clearInterval(timer);
}, [isLocked, timeLeft]);
    
}
