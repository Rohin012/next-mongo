"use client"
import axios from 'axios'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function profile() {
  const [data,setData]= useState("nothing")
  const [user,setUser]=useState(
    
  "")
  const router = useRouter()
  const logout = async ()=>{
    try{
      await axios.get("/api/users/logout")
      toast.success("Logout Successfully")
      router.push("/login")

    }catch(error:any){
      console.log(error.message)
    }
  }

  const ProfileDetails =  async ()=>{
    const res = await axios.get("/api/users/me")
    setData(res?.data?.data?._id)
setUser(res?.data?.data?.username)

    console.log(res?.data?.data,"data")
  }
 console.log(data,user)
  return (
    <>
    <div>
      <div>{data === "nothing"?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</div>
      profile
    </div>
    <div>{user}</div>
    <button onClick={logout}>logout</button>
    <button onClick={ProfileDetails}>ProfileDetails</button>

    </>
  )
}
