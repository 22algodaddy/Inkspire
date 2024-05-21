import React, { useId } from "react"
function Select({
    options,
    label,
    className="",
    ...props
},ref)//Arguments for Select function
{
    const id = useId();
    return(<div>
        {label && <label htmlFor={id} className="inline-block mb-1 pl-1"></label>}
        <select id={id} 
        className={`outline-none w-full bg-transparent py-1.5 ${className}`} 
         {...props} ref={ref}>
            {options?.map((option)=>(
                <option key={option} value={option}>{option}</option>
            ))}
         </select>
    </div>)
}
export default React.forwardRef(Select);