import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const [isShown, setIsShown] = useState(false);
    const [form, setForm] = useState({site: '', username: '', password: ''})
    const [passwordArray, setPasswordArray] = useState([])
    const inputRef = useRef(null);

    const getPasswords = async () => {
        let req = await fetch('http://localhost:3000/')
        let passwords = await req.json()
        setPasswordArray(passwords)
        console.log(passwords)
    }

    useEffect(() => {
      getPasswords()
    }, [])
    

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    
    const savePassword = async () => {
        if (form.site && form.username && form.password) {
            try {
                // If the form has an id, it means we're editing an existing password
                if (form.id) {
                    await fetch("http://localhost:3000/", {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ id: form.id })
                    });
    
                    setPasswordArray(passwordArray.filter(item => item.id !== form.id));
                }
    
                const newPassword = { ...form, id: form.id || uuidv4() };
                setPasswordArray([...passwordArray, newPassword]);
    
                await fetch("http://localhost:3000/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newPassword)
                });
    
                setForm({ site: '', username: '', password: '', id: '' });
            } catch (error) {
                console.error('Error saving password:', error);
                toast('ERROR: password not saved!', {});
            }
        } else {
            toast('ERROR: Missing fields!', {});
        }
    };
    
    const deletePassword = async (id) => {
        const confirmDelete = confirm('Are you sure you want to delete?');
        if (confirmDelete) {
            try {
                setPasswordArray(passwordArray.filter(item => item.id !== id));
    
                await fetch("http://localhost:3000/", {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id })
                });
            } catch (error) {
                console.error('Error deleting password:', error);
                toast('ERROR: Could not delete password!', {});
            }
        }
    };
    
    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(item => item.id === id);
        if (passwordToEdit) {
            setForm(passwordToEdit);
            setPasswordArray(passwordArray.filter(item => item.id !== id))
        }
    };
    

    const showPassword = (params) => {
        setIsShown(!isShown);
        if (inputRef.current) {
            inputRef.current.type = isShown ? 'password' : 'text';
        }
    }
    const copyText = (text) => {
        toast('copied to clipboard!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
            <ToastContainer />
            <div>
                <h1 className='text-4xl text font-bold text-center'>
                    <span className='text-blue-500'>&lt;</span>
                        Pass
                    <span className='text-blue-500'>OP/&gt;</span>
                </h1>
                <p className='text-blue-900 text-lg font-bold text-center'>Your own password manager.</p>
                <div className='flex flex-col p-4 gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} className='w-full rounded-full border border-blue-500 p-4 py-1' placeholder='Website' type="text" name='site' id='site'/>
                    <div className='flex w-full gap-8 '>
                        <input value={form.username} onChange={handleChange} className='w-full rounded-full border border-blue-500 p-4 py-1' placeholder='username' type="text" name="username" id="username" />
                        <input value={form.password} onChange={handleChange} className='w-full rounded-full border border-blue-500 p-4 py-1' placeholder='password' type="password" name="password" ref={inputRef} id="password" />
                        <span className='flex flex-col justify-center items-baseline cursor-pointer font-bold text-sm' onClick={showPassword}>
                            <p>
                                {isShown ? 'Hide' : 'Show'}
                            </p>
                        </span>
                    </div>
                    <button onClick={savePassword} className='flex w-fit justify-center items-center border-2 border-blue-600 rounded-full bg-blue-500 p-4 py-2 hover:bg-blue-300 hover:font-bold'>Add Password</button>
                </div>
                <p className='font-bold text-2xl py-4'>Your passwords</p>
                {passwordArray.length == 0 && <h2 className='font-semibold text-xl'>No passwords to show</h2>}
                {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className='bg-blue-600 text-white'>
                            <tr >
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody  className='bg-lime-50'>
                            {
                                passwordArray.map((item, index) => {
                                    return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex justify-center items-center gap-2'>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <img className='w-4 cursor-pointer active:invert' src="./src/assets/copy.svg" alt="" onClick = {() => {copyText(item.site)}}/>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex justify-center items-center gap-2'>
                                            {item.username}
                                            <img className='w-4 cursor-pointer active:invert' src="./src/assets/copy.svg" alt="" onClick = {() => {copyText(item.username)}}/>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex justify-center items-center gap-2'>
                                            {item.password}
                                            <img className='w-4 cursor-pointer active:invert' src="./src/assets/copy.svg" alt="" onClick = {() => {copyText(item.password)}}/>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex justify-center items-center gap-4'>
                                            <img className='w-4 cursor-pointer active:invert' src="./src/assets/edit.svg" alt="" onClick = {() => {editPassword(item.id)}}/>
                                            <img className='w-4 cursor-pointer active:invert' src="./src/assets/delete.svg" alt="" onClick = {() => {deletePassword(item.id)}}/>
                                        </div>
                                    </td>
                                </tr>
                                })
                            }
                        </tbody>
                    </table>}
            </div>
        </>
    )
}

export default Manager
