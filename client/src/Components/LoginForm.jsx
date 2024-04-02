import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { DevTool } from '@hookform/devtools'
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from 'firebase/auth'
import { auth, app } from '../firebase'

const LoginForm = () => {
    const navigate = useNavigate()
    useEffect(()=>{
        auth.onAuthStateChanged(user =>{
            // if user is NOT null, they are logged in, navigate to dash
            if(user != null){
                navigate('/dashboard')
            }
        })
    },[])
    const form = useForm()
    const { register, control, handleSubmit, formState } = form
    const { errors } = formState;

    const onSubmit = (data) => {
        setPersistence(auth, browserSessionPersistence)
        .then(() => {
            signInWithEmailAndPassword(auth, data.email, data.password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    navigate('/dashboard')
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        })
    }

    return (
        <div>
            <h1 class='mb-5'> Login</h1>
            <form action="" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className='form-control' class=''>
                    <label htmlFor="email" class='mx-3'> Email </label>
                    <input type="email" id="email" class=''
                        {...register("email", {
                            pattern: {
                                value: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
                                message: 'Invalid Format'
                            }

                        })}
                    />
                    <p className='error'>{errors.email?.message}</p>
                </div>

                <div lassName='form-control' class=''>
                    <label htmlFor="password" class='mx-1'>Password</label>
                    <input type="password" id="password" class='mx-1'
                        {...register("password", {
                            required: {
                                value: true,
                                message: "Channel name is required"
                            }
                        })}
                    />
                </div>
                <button class="btn btn-primary my-2">Submit</button>
            </form>
            {/* <DevTool control={control} /> */}
        </div>
    )
}

export default LoginForm
