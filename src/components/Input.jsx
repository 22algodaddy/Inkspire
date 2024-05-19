import {useId} from "react"
import { forwardRef } from "react";

const Input = forwardRef( function Input({
    label,
    type="text",
    className="",
    ...props
},ref)
{
    const id = useId();
    return(
        <div className="w-full">
            {label && 
            <label 
            htmlFor={id} className="inline-block mb-1 pl-1">
             {label}
            </label>}
            <input 
            type={type} 
            className={`outline-none w-full bg-transparent py-1.5 ${className}`} 
            ref={ref} //refer to timestamp 5:36:20
            id={id} 
            {...props}>
            </input>
        </div>
        
    )
}
)
export default Input