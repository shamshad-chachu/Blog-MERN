import React from 'react'
import { motion } from "motion/react"
const Hero = () => {
  return (
    <div className='bg-blue-600 h-56 md:mask-r-from-65% md:mask-l-from-65%'>
      <div className='text-white w-[75%]  mx-auto h-full flex flex-col justify-center items-center gap-3'>
          <motion.h1
          initial={{
            opacity:0,
            y:-10,
            filter:"blur(10px)"
          }}
          whileInView={{
            opacity:1,
            y:0,
            filter:"blur(0px)"
          }}
          transition={{
            duration:0.4,
            ease:'easeInOut'
          }}
          className='md:text-5xl text-4xl font-bold tracking-tight'>Welcome To My Blog</motion.h1>
          <motion.p
          initial={{
            opacity:0,
            y:-10,
            filter:"blur(10px)"
          }}
          whileInView={{
            opacity:1,
            y:0,
            filter:"blur(0px)"
          }}
          transition={{
            duration:0.4,
            ease:'easeInOut'
          }}
          className='text-lg text-neutral-200'>Discover tutorials, stories, case studies, and tips for learning and growing.</motion.p>
      </div>
    </div>
  )
}

export default Hero