import React, { useState } from 'react'
import Context from '/unsplash.jpg';
import git from '../assets/Vector.png';
import {Toaster, toast} from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidate, passwordValidate} from '../formikhooks/validate';
import { Link, useNavigate} from 'react-router-dom';
import convertToBase64 from '../formikhooks/img_convert';
import { registerUser } from '../utilities/helper';


export default function registration() {
    
  const navigate=useNavigate();

  const[file, setFile]= useState()

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  // {/* formik meesage prints */}

  const formik = useFormik({
    initialValues: {
      email:'',
      username: '',
      password: '',  
    },
    validate: registerValidate ,

    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values= await Object.assign(values, {profile: file || ''})
      const registerSuccess= registerUser(values)
      toast.promise(registerSuccess,{
        loading: 'adding new user',
        success: <b style={{fontSize: '11px'}}>you have been registered succesfully</b>,
        error: <b style={{fontSize: '11px'}}>try again later!</b>
      })
      registerSuccess.then(function(){
        navigate('/')
      })
    },
  })

  return (
    <div className="flex h-screen bg-cover overflow-hidden">
        <Toaster position='top-center' reverseOrder={false}/>
        <div className="w-full h-full flex ">
          <div className=" lg:block hidden" style={{ width: '60%' }}>
            <div className='flex flex-row items-center absolute gap-2 p-10 cursor-pointer'>
              <img src={git} alt="branch" className='w-8' />
            </div>

            <form onSubmit={formik.handleSubmit} className='flex justify-center items-center h-full'>
              <div className=' flex flex-col gap-12 '>
                <div className=' flex  flex-col gap-2'>
                  <h1 className=' text-[27px] font-medium text-center' style={{fontFamily: 'Poppins, sans-serif'}}>Register now</h1>
                  <p className=' text-xs font-medium text-center  text-[#96B7C5]' style={{fontFamily: 'Poppins, sans-serif'}}>Let&apos;s join to the community</p>
                </div>
                <div className=' flex flex-col items-center'>
                  <div className=' rounded-full border-2 border-[#439BC0] p-1 '>
                    <div className=' w-32 h-32 rounded-full overflow-hidden ' >
                      <label htmlFor='profile'>
                        <img className=' object-cover object-center bg-cover overflow-hidden bg-rea ' src={file ||Context } alt="user image"  />
                        <input onChange={onUpload} type='file' id='profile' name='profile ' className=' hidden' />
                      </label>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-3'>
                  <input {...formik.getFieldProps('email')} className={`${formik.errors.password && formik.touched.password ? 'border-rose-500' : ''}  w-96 p-2 text-[14px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} style={{fontFamily: 'Poppins, sans-serif'}} type='email' placeholder='Enter your email*' />
                  {formik.errors.email && formik.touched.email?(
                    <span style={{ fontFamily: 'Poppins, sans-serif' }} className="text-xs px-2 text-red-500">
                      {formik.errors.email}
                    </span>
                    ):(
                    <></>
                    )}
                  <input {...formik.getFieldProps('username')} className={`${formik.errors.password && formik.touched.password ? 'border-rose-500' : ''}  w-96 p-2 text-[14px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} style={{fontFamily: 'Poppins, sans-serif'}} type='text' placeholder='Choose your username*' />
                  {formik.errors.username && formik.touched.username?(
                    <span style={{ fontFamily: 'Poppins, sans-serif' }} className="text-xs px-2 text-red-500">
                      {formik.errors.username}
                    </span>
                    ):(
                    <></>
                    )}
                  <input {...formik.getFieldProps('password')} className={`${formik.errors.password && formik.touched.password ? 'border-rose-500' : ''}  w-96 p-2 text-[14px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} style={{fontFamily: 'Poppins, sans-serif'}} type='password' placeholder='Enter your password*' />
                  {formik.errors.password && formik.touched.password?(
                    <span style={{ fontFamily: 'Poppins, sans-serif' }} className="text-xs px-2 text-red-500">
                      {formik.errors.password}
                    </span>
                  ):(
                  <></>
                  )}
                  <div >  
                    <button type='submit' onSubmit={registerValidate} className='bg-[#439BC0] px-[140px] py-1 text-white font-medium rounded-sm hover:bg-[#3a87a8] duration-300 ' style={{fontFamily: 'Poppins, sans-serif'}}>Register now</button>
                  </div>
                  <div className='flex flex-row justify-center gap-1'>
                    <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[#96B7C5] text-xs' >Already have an account?</p>
                    <Link to='/'>
                      <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-rose-600 text-xs hover:underline duration-300 cursor-pointer'>Sign in</p>
                    </Link>
                  </div>
                </div>      
              </div>
            </form>

          </div>
          <div className="flex-grow bg-cover bg-no-repeat backdrop-blur-sm flex justify-center items-center"  style={{backgroundImage: 'url(../../public/unsplash.jpg)'}}>
          {/* mobile and tablet view */}
          
            <div className='w-[92%] h-2/3 bg-white flex flex-col justify-center items-center lg:hidden'>

              <div className='flex flex-row items-center hover:underline underline-offset-2 duration-300 p-5 absolute top-0'>
                <img src={git} alt="branch" className='w-[12px]' />
                <div>
                  <h1 className=' text-xs text-white opacity-60 '>/Project UX..</h1>
                </div>
              </div>
              <form onSubmit={formik.handleSubmit} className='flex justify-center items-center h-full'>
                <div className=' flex flex-col gap-9 '>
                  <div className=' flex  flex-col gap-1'>
                    <h1 className=' text-[20px] font-semibold text-center' style={{fontFamily: 'Poppins, sans-serif'}}>Register now</h1>
                    <p className=' text-[10px] font-medium text-center  text-[#96B7C5]' style={{fontFamily: 'Poppins, sans-serif'}}>Let&apos;s join to the community </p>
                  </div>
                  <div className=' flex flex-col items-center'>
                    <div className=' rounded-full border-2 border-[#439BC0] p-1 '>
                      <div className=' w-28 h-28 rounded-full overflow-hidden ' >
                        <label htmlFor='profile1'>
                          <img className=' object-cover object-center ' src={ file || Context } alt="context"  />
                          <input onChange={onUpload} type='file' id='profile1' name='profile ' className=' hidden' />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-2'>
                  <input {...formik.getFieldProps('email')} className={`${formik.errors.password && formik.touched.password ? 'border-rose-500' : ''} w-[310px] p-2 text-[12px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} style={{fontFamily: 'Poppins, sans-serif'}} type="email" placeholder='Enter your email*' />
                  {formik.errors.email && formik.touched.email?(
                    <span style={{ fontFamily: 'Poppins, sans-serif' }} className="text-xs px-1 text-red-500">
                      {formik.errors.email}
                    </span>
                    ):(
                    <></>
                    )}
                    <input {...formik.getFieldProps('username')} className={`${formik.errors.password && formik.touched.password ? 'border-rose-500' : ''} w-[310px] p-2 text-[12px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} style={{fontFamily: 'Poppins, sans-serif'}} type="text" placeholder='Choose your useranme*' />
                    {formik.errors.username && formik.touched.username?(
                    <span style={{ fontFamily: 'Poppins, sans-serif' }} className="text-xs px-1 text-red-500">
                      {formik.errors.username}
                    </span>
                    ):(
                    <></>
                    )}
                    <input {...formik.getFieldProps('password')} className={`${formik.errors.password && formik.touched.password ? 'border-rose-500' : ''} w-[310px] p-2 text-[12px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} style={{fontFamily: 'Poppins, sans-serif'}} type="password" placeholder='Enter your password*' />
                    {formik.errors.password && formik.touched.password?(
                    <span style={{ fontFamily: 'Poppins, sans-serif' }} className="text-xs px-1 text-red-500">
                      {formik.errors.password}
                    </span>
                    ):(
                    <></>
                    )}
                    <div >
                      <button type='submit' onSubmit={formik.handleSubmit} className='bg-[#439BC0] px-[115px] py-1 text-white font-medium rounded-sm hover:bg-[#3a87a8] duration-300 text-[14px] ' style={{fontFamily: 'Poppins, sans-serif'}}>Register now</button>
                    </div>
                    <div className='flex flex-row gap-1 justify-center'>
                      <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[#96B7C5] text-[9px]' >Already have an account? </p>
                      <Link to='/'>
                        <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-rose-600 text-[9px] hover:underline duration-300 cursor-pointer'>Sign in</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

        </div>
    </div>

  )
}
