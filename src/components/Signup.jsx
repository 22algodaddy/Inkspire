import {useState} from 'react'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import {useForm} from "react-hook-form"
import {Button,Input,Logo} from "./index"
import {Link,useNavigate} from "react-router-dom"


export default function Signup(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register,handleSubmit} = useForm();
    const [err,Seterr] = useState("")
    const createAccount = async(data)=>{
        Seterr("")//emptying out the error
        try{
            const Userdata = await authService.createAccount(data);
            if(Userdata){
                const Userdata = authService.getCurrentUser();
                if(Userdata)dispatch(login(Userdata));
                navigate("/");
            }

        }catch(err){
            Seterr(err.message)}//Catch block err has property named message which conatins the error message
    }
    return(
        <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {err && <p className="text-red-600 mt-8 text-center">{err}</p>}

            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input
                    label="Full Name: "
                    placeholder="Enter your full name"
                    {...register("name", {
                        required: true,
                    })}
                    />
                    <Input
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                            "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label="Password: "
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                    })}
                    />
                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </div>
            </form>
        </div>

</div>
    )
}