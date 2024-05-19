import {useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import './App.css'
import authService from "./appwrite/auth";
import {login,logout} from "./store/authSlice"
import { Header,Footer, Login } from './components';
function App() {
  const [loading,setLoading]=useState(true); //loading is created since getting data from backend might take time, based on state
                                            //based on loading state we can do conditonal rendering
  const dispatch = useDispatch();   
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData)dispatch(login(userData))
      else dispatch(logout())
    })
    .finally(()=>setLoading(false))
  },[])                                       
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className='w-full block'>
        <Header/>
         <main>
          <Login />
           {/*<Outlet/>*/}
         </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
