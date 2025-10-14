"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
export default function Signup(){
  const router= useRouter();
  const [user,setUser]=useState({
    nickname:"",
    username:"",
    email:"",
    password:"",
    palname:""
  });
  const [buttonDis ,setButtonDis]=useState(false);
  const [loading,setLoading]=useState(false);

  const onSignup = async()=>{
    try{
      setLoading(true);
      const response = await axios.post('/api/users/signup',user);
      console.log("signup success",response.data);
      router.push("/login");

    }catch(error:any){
      console.log("Signup failes",error.message);
      toast.error(error.message);
    }finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    if(user.nickname.length>0&&user.username.length>0&&user.email.length>0 && user.password.length>0&&user.palname.length>0){
      setButtonDis(false);
    }else{
      setButtonDis(true);
    }
  },[user]);

  return(
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-pink-500 flex flex-col items-center justify-center py-2">
        <h1 className="text-6xl pb-8 pl-5 font-fancy font-black text-pink-900">SignUp</h1>
        <label className="font-black" htmlFor="nickname">nickname</label>
        <input 
        className="border-2 border-purple-500 rounded-md px-4 py-2 focus:outline-none text-pink-900 bg-pink-200 hover:bg-pink-100 transition-colors"
         id="nickname"
         type="nickname"
         value={user.nickname}
         onChange={(e)=>setUser({...user,nickname:e.target.value})}
         placeholder="enter your nickname"/>
        <label className="font-black" htmlFor="username">username</label>
        <input 
        className="border-2 border-purple-500 rounded-md px-4 py-2 focus:outline-none text-pink-900 bg-pink-200 hover:bg-pink-100 transition-colors"
         id="username"
         type="username"
         value={user.username}
         onChange={(e)=>setUser({...user,username:e.target.value})}
         placeholder="enter your username"/>
        <label className="font-black" htmlFor="email">email</label>
        <input 
        className="border-2 border-purple-500 rounded-md px-4 py-2 focus:outline-none text-pink-900 bg-pink-200 hover:bg-pink-100 transition-colors"
         id="email"
         type="email"
         value={user.email}
         onChange={(e)=>setUser({...user,email:e.target.value})}
         placeholder="enter your email"/>
        <label className="font-black" htmlFor="password">password</label>
        <input 
        className="border-2 border-purple-500 rounded-md px-4 py-2 focus:outline-none text-pink-900 bg-pink-200 hover:bg-pink-100 transition-colors"
         id="password"
         type="password"
         value={user.password}
         onChange={(e)=>setUser({...user,password:e.target.value})}
         placeholder="enter your password"/>
        <label className="font-black" htmlFor="palname">pal-name</label>
        <input 
        className="border-2 border-purple-500 rounded-md px-4 py-2 focus:outline-none text-pink-900 bg-pink-200 hover:bg-pink-100 transition-colors"
         id="palname"
         type="palname"
         value={user.palname}
         onChange={(e)=>setUser({...user,palname:e.target.value})}
         placeholder="diary name"/>
         <button onClick={onSignup} type="button" className="mt-7 text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">{buttonDis?"No sign up":"Sign up"}</button>
         <Link href="/login">Visit Login</Link>
    </div>
  );
}