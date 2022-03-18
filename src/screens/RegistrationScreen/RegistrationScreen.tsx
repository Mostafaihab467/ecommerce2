import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './RegistrationScreen.scss'
import newUser from '../../assets/images/Newuser.png'
import { C_User } from '../../Models/userModel'
import { Register } from '../../store/Action/userAction'
function RegistrationScreen() {
    const [name, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')

    const dispatch = useDispatch()


    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (confirmPassword == password) {
            const user = new C_User(email,password, name )
            dispatch(Register(user))
        }
    }

    return (
        <div className='reg_div'>



            <form onSubmit={handleSubmit} className='form_reg'>
                <h1>Sign Up</h1>
                <label>User Name</label>
                <input type={'text'} placeholder='Enter your Name' onChange={(e) => setUserName(e.target.value)} />

                <label>Email Address</label>
                <input type={'email'} placeholder='Email Address' onChange={(e) => setEmail(e.target.value)} />

                <label>Password</label>
                <input type={'passowrd'} placeholder='Enter Your Passowrd' onChange={(e) => setpassword(e.target.value)} />

                <label>Confirm Password</label>
                <input type={'passowrd'} placeholder='Enter Your Passowrd Again' onChange={(e) => setconfirmPassword(e.target.value)} />

                <div className='bt_div'><button type='submit' >Sign Up</button></div>
            </form>
            <div className='img_container'><img src={newUser} /></div>
        </div>
    )
}

export default RegistrationScreen