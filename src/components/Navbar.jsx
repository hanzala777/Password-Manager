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
            <ul>
                <li className='flex gap-4 text-red-50'>
                    <a className='hover:font-bold' href="#">Home</a>
                    <a className='hover:font-bold' href="#">About</a>
                    <a className='hover:font-bold' href="#">Contact</a>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
