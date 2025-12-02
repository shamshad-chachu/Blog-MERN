import React from 'react'
import{Copyright} from 'lucide-react'
const Footer = () => {
  return (<>
        <span className='w-full h-0.5 bg-neutral-300 dar:bg-neutral-800 inline-block '/>
        <div className='flex flex-row gap-1 justify-center py-5 bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100'>
        <Copyright /> 
          <p>2025 | | My Blog - All rights reserved.</p>
        </div>
    </>
  )
}

export default Footer