import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   authService.getCurrentUser()
  //   .then((userData) => {
  //     if (userData) {
  //       dispatch(login({userData}))
  //     } else {
  //       dispatch(logout())
  //     }
  //   })
  //   .finally(() => setLoading(false))
  // }, [])
  useEffect(()=>{
    const fetchUSer= async()=>{
       try{
        const userData = await authService.getCurrentUser();
        if(userData){
          dispatch(login({userData}))
        }else{
          dispatch(logout())
        }
       }catch(err){throw err;}
       finally{setLoading(false)}
    };
    fetchUSer()
  },[dispatch]);
  
  return !loading ? (
    <div className='w-full flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : <h1>Please Wait</h1>
}

export default App