import React from 'react'

const Manager = () => {
  return (
    <div className="mycontainer bg-red-200">
        <h1 className='text-4xl'>
            <span className='text-blue-500'>&lt; </span>
                Pass
            <span className='text-blue-500'>OP /&gt;</span>
        </h1>
        <p>Your own password manager.</p>
        <div className='flex flex-col p-4'>
            <input className='m-3 rounded-full p-2' placeholder='Website' type="text" name='' id=''/>
            <div className='flex gap-3 m-auto '>
                <input className='rounded-full p-2' placeholder='username' type="text" name="" id="" />
                <input className='rounded-full p-2' placeholder='password' type="text" name="" id="" />
            </div>
        </div>
    </div>
  )
}

export default Manager
