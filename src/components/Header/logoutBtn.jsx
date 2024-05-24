import { useDispatch } from "react-redux"
import { logout } from "../../store/authSlice"
import authService from "../../appwrite/auth"
import { useNavigate } from "react-router-dom";
export default function LogoutBtn(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = ()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout());
            navigate("/login")
        }

        )
        .catch((err)=>console.log(err))
    }
    return(
        <button 
        className="px-6 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out transform bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-red-600 hover:scale-105"
         onClick={logoutHandler}
         >
             <span className="font-semibold text-white tracking-wide uppercase shadow-md hover:shadow-lg">
                  Logout
                </span>
        </button>
)
}