import React from 'react'
import { useState, useEffect } from 'react';

const Manager = () => {
    const [isShown, setIsShown] = useState(true);
    const [form, setForm] = useState({site: '', username: '', password: ''})
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
      let passwords = localStorage.getItem('passwords');
      if(passwords){
        setPasswordArray(JSON.parse(passwords))
      }
    }, [])
    

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    
    const savePassword = (params) => {
        setPasswordArray([...passwordArray, form])
        localStorage.setItem('password', JSON.stringify([...passwordArray, form]))
        console.log([...passwordArray, form])
    }
    
    const showPassword = (params) => {
        setIsShown(!isShown);
    }
    return (
        <div className="mycontainer bg-red-50">
            <h1 className='text-4xl text font-bold text-center'>
                <span className='text-blue-500'>&lt;</span>
                    Pass
                <span className='text-blue-500'>OP/&gt;</span>
            </h1>
            <p className='text-blue-900 text-lg font-bold text-center'>Your own password manager.</p>
            <div className='flex flex-col p-4 gap-8 items-center'>
                <input value={form.site} onChange={handleChange} className='w-full rounded-full border border-blue-500 p-4 py-1' placeholder='Website' type="text" name='site' id=''/>
                <div className='flex w-full gap-8 '>
                    <input value={form.username} onChange={handleChange} className='w-full rounded-full border border-blue-500 p-4 py-1' placeholder='username' type="text" name="username" id="" />
                    <input value={form.password} onChange={handleChange} className='w-full rounded-full border border-blue-500 p-4 py-1' placeholder='password' type="text" name="password" id="" />
                    <span className='flex flex-col justify-center items-center cursor-pointer font-bold text-lg' onClick={showPassword}>
                        <p>
                            {isShown ? 'Show' : 'Hide'}
                        </p>
                    </span>
                </div>
                <button onClick={savePassword} className='flex w-fit justify-center items-center border-2 border-blue-800 rounded-full bg-blue-400 p-4 py-2 hover:bg-blue-300 hover:font-bold'>Add Password</button>
            </div>
        </div>
    )
}

export default Manager
