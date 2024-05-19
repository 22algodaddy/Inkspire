import {useState , useEffect} from "react"
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"

export default function Applayout({children,authentication=true}){
    const navigate = useNavigate();
    const authstatus = useSelector((state)=>(state.auth.status));
    const [loader,setLoader] = useState(true);
    useEffect(()=>{
        if(authentication && authstatus!==authentication)navigate("/login")
        else if(!authentication && authstatus!==authentication)navigate("/")
        setLoader(false);
    },
    [authstatus,navigate])
    return loader ? <h1>"Loading..."</h1> : <>{children}</>
}


//authentication: A boolean indicating whether authentication is required (default is true).
//authstaus represents current authentication status from the store, if it is false then user need to be authenticated
//if it is true implies no need of re-directing to login page for authentication