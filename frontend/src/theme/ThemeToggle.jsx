import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../Context/StoreContext';
import {ChevronLeft, Sun,SunMoon} from 'lucide-react'
const ThemeToggle = () => {
  const {dark,setDark} = useContext(StoreContext)
  useEffect(()=>{
    if(dark){
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme","dark")
    }else{
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme","light")
    }
  },[dark])
  return (
    <button onClick={()=>setDark(!dark)}
     className='bg-neutral-700 dark:bg-neutral-100 text-neutral-100 dark:text-neutral-800 rounded-2xl text-sm px-5 w-20' >
      <div className='flex'>{dark?<Sun />:<SunMoon/>}<ChevronLeft /></div></button>
  )
}

export default ThemeToggle