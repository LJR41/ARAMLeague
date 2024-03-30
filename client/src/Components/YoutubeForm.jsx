import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { DevTool } from '@hookform/devtools'

let renderCount = 0

const YoutubeForm = () => {
    const form = useForm()
    const { register, control, handleSubmit, formState } = form
    const { errors } = formState;
    renderCount++
    // update

    const onSubmit = (data) => {
        console.log('Form submitted', data)
    }

    return (
        <div>
            <h1>Youtube Form ({renderCount})</h1>
            <form action="" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='form-control'>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username"
                        {...register("username", {
                            required: {
                                value: true,
                                message: "Username is required"
                            }
                        })}
                    />
                    <p className='error'>{errors.username?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email"
                        {...register("email", {
                            pattern: {
                                value: /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
                                message: 'Invalid Format'
                            }
                            
                        })}
                    />
                    <p className='error'>{errors.email?.message}</p>
                </div>

                <div className='form-control'>
                    <label htmlFor="channel">Channel</label>
                    <input type="text" id="channel"
                        {...register("channel", {
                            required: {
                                value: true,
                                message: "Channel name is required"
                            }
                        })}
                    />
                    <p className='error'>{errors.channel?.message}</p>
                </div>

                <button>Submit</button>
            </form>
            <DevTool control={control} />
        </div>
    )
}

export default YoutubeForm
