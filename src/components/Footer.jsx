import React from 'react'

const Footer = () => {
  return (
    <div>
        <div className='w-full fixed bottom-0 bg-slate-700 flex flex-col justify-center items-center'>
          <div className="logo font-bold text-red-50 text-2xl">
                <span className='text-blue-500'>&lt;</span>
                  Pass
                <span className='text-blue-500'>OP/&gt;</span>
          </div>
          <div className='flex text-white'>
            made with &nbsp; <img className='invert w-6' src="./src/assets/react.svg" alt="" />
            &nbsp; React &copy;Hanzala
          </div>
        </div>
    </div>
  )
}

export default Footer
