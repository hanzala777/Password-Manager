import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-red-700 '>
        <div className='mycontainer flex justify-between items-center px-4 py-5 h-14'>
            <div className="logo font-bold text-red-50 text-2xl">
                <span className='text-blue-500'>&lt;</span>
                Pass
                <span className='text-blue-500'>OP/&gt;</span>
            </div>
            <button >
            </button>
            <a href="https://react.dev" target='_blank' className='text-orange-50 bg-blue-500 my-5 rounded-full flex gap-2 justify-center items-center px-2'>
                <img className='invert w-10 p-1'  src='\src\assets\react.svg' alt="React" />
                <span className='font-bold'>React</span>
            </a>
        </div>
    </nav>
  )
}

export default Navbar
