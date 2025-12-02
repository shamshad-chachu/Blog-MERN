import React from 'react'

const Hero = () => {
  return (
    <div className='bg-blue-600 h-56'>
      <div className='text-white w-[75%]  mx-auto h-full flex flex-col justify-center items-center gap-3'>
          <h1 className='md:text-5xl text-4xl font-bold tracking-tight'>Welcome To My Blog</h1>
          <p className='text-lg text-neutral-200'>Discover tutorials, stories, case studies, and tips for learning and growing.</p>
      </div>
    </div>
  )
}

export default Hero