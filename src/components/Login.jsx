import {Link,useNavigate} from "react-router-dom"
import {login as storeLogin} from "../store/authSlice"
import {Button,Input,Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form" //timestamp: 5:55:00
import { useState } from "react"

export default function Login(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register,handleSubmit} = useForm();
    const [err,Seterr] = useState("");
    const login = async (data)=>{
        Seterr("");
        try{
          //  console.log(data)
            const session = await authService.login(data);
            console.log(session)
            if(session){
                const userdata = await authService.getCurrentUser();
                console.log(userdata)
                if(userdata)dispatch(storeLogin(userdata));
                navigate("/")
            }

        }catch(err){
            Seterr(err.message);
            console.log(err)
        }
    }

    return(
        <div className='flex items-center justify-center w-full'>
            <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%"></Logo>
                    </span>
                </div>
                    <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Don't have any account 
                        <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                        Sign Up
                        </Link>
                    </p>
                    {err && <p className="text-red-500 mt-8 text-center">{err}</p>}
                    <form onSubmit={handleSubmit(login)}className="mt-8">
                        <div className="space-y-5">
                            <input 
                            label="Email"
                            placeholder="Enter your Email Address: "
                            type="email"
                            className="w-full border border-gray-300 rounded-md p-3"
                            {...register("email",{
                                required:true,
                                validate:{
                                    matchPattern:(value)=>/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                                    .test(value) || 
                                    "Invalid Email Address",
                                }
                            })}
                            ></input>
                            <input 
                            label="Password"
                            placeholder="Enter your Password: "
                            type="password"
                            className="w-full border border-gray-300 rounded-md p-3"
                            {...register("password",{
                                required:true,
                                minLength:6,
                                maxLength:20
                            })}></input>
                            <Button 
                            type="submit"
                            className="w-full bg-primary text-white rounded-md p-3">Sign In</Button>
                        </div>
                    </form>
            </div>
        </div>
    )
}

//Regex is only this much: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
//Regex is written between forward slash and back slash