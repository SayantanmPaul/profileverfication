import React, { useEffect } from 'react'
import git from '../assets/Vector.png';
import {Toaster, toast} from 'react-hot-toast';
import {useFormik} from 'formik';
import { resetpsdValidation} from '../formikhooks/validate';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { resetPasswordfc } from '../utilities/helper';
import { useAuthStore } from '../store/store';
import useFetch from '../customhooks/fetch.hook';
import {LineWave} from 'react-loader-spinner'
export default function resetpassword() {


  const navigate=useNavigate();
  const [{isLoading, apiData, status, serverError}]= useFetch('resetSession')
  const {username}= useAuthStore(state=>state.auth)

  {/* formik meesage prints */}
  const formik = useFormik({
    initialValues: {
      password: '',
      repeat_pwd:'',
    },
    validate: resetpsdValidation ,

    validateOnBlur: false,
    validateOnChange: false,
    
    onSubmit: async (values) => {

      const resetPromise= resetPasswordfc({username, password: values.password})

      toast.promise(resetPromise,{
        loading: "updateing password",
        success: <b style={{fontSize: '11px'}} >reset successfully</b>,
        error: <b style={{fontSize: '11px'}}>try again later</b>
      })
      resetPromise.then(function(){ navigate('/password')})
    },
  });

  if(isLoading) return <div className=' flex h-screen items-center justify-center'> <LineWave height="100" width="100" color="#4fa94d" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} firstLineColor="" middleLineColor="" lastLineColor="" /></div>
  if(serverError) return <h1 style={{fontFamily:'Poppins, sans-serif'}} className='flex h-screen items-center justify-center text-xl text-rose-700'>{serverError.message}</h1>
  if( status && status !==201) return <Navigate to={'/password'}></Navigate>

  return (
    <div className="flex h-screen bg-cover overflow-hidden">
      <div className="w-full h-full flex ">
        <div className=" lg:block hidden" style={{ width: '60%' }}>
          <div className='flex flex-row items-center absolute p-11 cursor-pointer'>
            <Link to={'https://github.com/SayantanmPaul/profileverfication'}>
              <img src={git} alt="branch" className=' w-7' />
            </Link>
          </div>
          <form onSubmit={formik.handleSubmit} className='flex justify-center items-center h-full'>
            <div className=' flex flex-col gap-12 '>
              <div className=' flex  flex-col gap-2'>
                <h1 className=' text-[27px] font-medium text-center' style={{fontFamily: 'Poppins, sans-serif'}}>Reset Password</h1>
                <p className=' text-xs font-medium text-center  text-[#96B7C5]' style={{fontFamily: 'Poppins, sans-serif'}}>Enter new password which only you can remember</p>
              </div>
              <div className='flex flex-col gap-3'>
                <input {...formik.getFieldProps('password')} className={`${formik.errors.password && formik.touched.password ? 'border-rose-500' : ''}  w-96 p-2 text-[14px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} style={{fontFamily: 'Poppins, sans-serif'}} type='text' placeholder='Enter new password' />
                
                <input {...formik.getFieldProps('repeat_pwd')} className={`${formik.errors.password && formik.touched.password ? 'border-rose-500' : ''}  w-96 p-2 text-[14px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} style={{fontFamily: 'Poppins, sans-serif'}} type='text' placeholder='Confirm new password' />
                {formik.errors.password && formik.touched.password?(
                  <span style={{ fontFamily: 'Poppins, sans-serif' }} className="text-xs px-2 text-red-500">
                    {formik.errors.password}
                  </span>
                ):(
                <></>
                )}
                <div >  
                  <button type='submit' className='bg-rose-500 px-[136px] py-1 text-white font-medium rounded-sm hover:bg-rose-700 duration-300 ' style={{fontFamily: 'Poppins, sans-serif'}}>Confirm reset</button>
                </div>
              </div>      
            </div>
          </form>

        </div>
        <div className="flex-grow bg-cover bg-no-repeat backdrop-blur-sm flex justify-center items-center"  style={{backgroundImage: 'url(../../public/unsplash2.jpg)'}}>
        {/* mobile and tablet view */}
        
          <div className='w-[92%] h-[60%] bg-white flex flex-col justify-center absolute items-center lg:hidden'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className='flex flex-row items-center top-5 relative'>
              <Link to={'https://github.com/SayantanmPaul/profileverfication'}>
                <img src={git} alt="branch" className='w-5' />
              </Link>
            </div>
            <form onSubmit={formik.handleSubmit} className='flex justify-center items-center h-full'>
              <div className=' flex flex-col gap-14'>
                <div className=' flex  flex-col gap-1'>
                  <h1 className=' text-[20px] font-semibold text-center' style={{fontFamily: 'Poppins, sans-serif'}}>Reset password</h1>
                  <p className=' text-[10px] font-medium text-center  text-[#96B7C5]' style={{fontFamily: 'Poppins, sans-serif'}}>Enter new password which only you can remember</p>
                </div>
                <div className='flex flex-col gap-3'>
                  <input {...formik.getFieldProps('password')} className={`${formik.errors.password && formik.touched.password ? 'border-rose-500' : ''} w-[310px] p-2 text-[12px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} style={{fontFamily: 'Poppins, sans-serif'}} type="text" placeholder='Enter new password' />

                  <input {...formik.getFieldProps('repeat_pwd')} className={`${formik.errors.password && formik.touched.password ? 'border-rose-500' : ''} w-[310px] p-2 text-[12px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} style={{fontFamily: 'Poppins, sans-serif'}} type="text" placeholder='Enter new our password' />
                  {formik.errors.password && formik.touched.password?(
                  <span style={{ fontFamily: 'Poppins, sans-serif' }} className="text-xs px-2 text-red-500">
                    {formik.errors.password}
                  </span>
                  ):(
                  <></>
                  )}
                  <div >
                    <button type='submit' className='bg-rose-500 px-[106px] py-1 text-white font-medium rounded-sm hover:bg-rose-700 duration-300 text-[14px] ' style={{fontFamily: 'Poppins, sans-serif'}}>Confirm reset</button>
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

