import {Editor} from "@tinymce/tinymce-react"

export default function RTE({name,control,label,defaultValue=""}){
    return(
       <div className="w-full">
        {label && <label className="inline-block mb-1">{label}</label>}
       </div>
    )
}