import React from 'react'
import Context from '/unsplash.jpg';
import git from '../assets/Vector.png';
import {Toaster, toast} from 'react-hot-toast';
import {useFormik} from 'formik';
import { passwordValidate} from '../formikhooks/validate';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../customhooks/fetch.hook';
import { useAuthStore } from '../store/store';
import {LineWave} from 'react-loader-spinner'
import { verifyPassword } from '../utilities/helper';

export default function password() {

  const navigate=useNavigate()

  const { username } = useAuthStore(state => state.auth);
  const [{ isLoading, apiData, serverError}] = useFetch(`/user/${username}`);

  {/* formik meesage prints */}
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validate: passwordValidate ,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {


      let loginPromise= verifyPassword({username, password: values.password})

      try {
        await loginPromise();
      } catch (errors) {
        formik.setFieldError('password', "password didn't matched");
      }
      loginPromise.then(res=>{

        const {data}= res;
        const {token}= data; 
        localStorage.setItem('token', token)
        navigate('/profile')
      })
      
    },
  });

  if(isLoading) return <div className=' flex h-screen items-center justify-center'> <LineWave height="100" width="100" color="#4fa94d" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} firstLineColor="" middleLineColor="" lastLineColor="" /></div>
  if(serverError) return <h1 style={{fontFamily:'Poppins, sans-serif'}} className='flex h-screen items-center justify-center text-xl text-rose-700'>{serverError.message}</h1>

  return (
    <>
    <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div className="flex h-screen bg-cover overflow-hidden">
      
      <div className="w-full h-full flex ">
        <div className=" lg:block hidden" style={{ width: '60%' }}>
          <div className='flex flex-row items-center absolute gap-2 p-10 cursor-pointer'>
            <img src={git} alt="branch" className='w-8' />
          </div>

          <form onSubmit={formik.handleSubmit} className='flex justify-center items-center h-full'>
            <div className=' flex flex-col gap-12 '>
              <div className=' flex  flex-col gap-2'>
                <h1 className=' text-[27px] font-medium text-center' style={{fontFamily: 'Poppins, sans-serif'}}>Welcome back, {apiData?.username} </h1>
                <p className=' text-xs font-medium text-center  text-[#96B7C5]' style={{fontFamily: 'Poppins, sans-serif'}}>Welcome back! Please enter your details.</p>
              </div>
              <div className=' flex flex-col items-center'>
                <div className=' rounded-full border-2 border-[#439BC0] p-1 '>
                  <div className=' w-32 h-32 rounded-full overflow-hidden ' >
                    <img className=' object-cover object-center ' src={apiData?.profile || Context} alt="context"  />
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <input {...formik.getFieldProps('password')} className={`${formik.errors.password && formik.touched.password ? 'border-rose-500' : ''}  w-96 p-2 text-[14px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} style={{fontFamily: 'Poppins, sans-serif'}} type='password' placeholder='Enter your password' />
                {formik.errors.password && formik.touched.password?(
                  <span style={{ fontFamily: 'Poppins, sans-serif' }} className="text-xs px-2 text-red-500">
                    {formik.errors.password}
                  </span>
                ):(
                <></>
                )}
                <div >  
                  <button type='submit' onSubmit={passwordValidate} className='bg-[#439BC0] px-[146px] py-1 text-white font-medium rounded-sm hover:bg-[#3a87a8] duration-300 ' style={{fontFamily: 'Poppins, sans-serif'}}>Let&apos;s sign in</button>
                </div>
                <div className='flex flex-row justify-center gap-1'>
                  <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[#96B7C5] text-xs' >Forgot Password? </p>
                  <Link to='/recoverpassword'>
                    <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-rose-600 text-xs hover:underline duration-300 cursor-pointer'>recover now</p>
                  </Link>
                </div>
              </div>      
            </div>
          </form>

        </div>
        <div className="flex-grow bg-cover bg-no-repeat backdrop-blur-sm flex justify-center items-center"  style={{backgroundImage: 'url(../../public/unsplash.jpg)'}}>
        {/* mobile and tablet view */}
        
          <div className='w-[92%] h-2/3 bg-white flex flex-col justify-center items-center lg:hidden'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className='flex flex-row items-center hover:underline underline-offset-2 duration-300 p-5 absolute top-0'>
              <img src={git} alt="branch" className='w-[12px]' />
              <div>
                <h1 className=' text-xs text-white opacity-60 '>/Project UX..</h1>
              </div>
            </div>
            <form onSubmit={formik.handleSubmit} className='flex justify-center items-center h-full'>
              <div className=' flex flex-col gap-9 '>
                <div className=' flex  flex-col gap-1'>
                  <h1 className=' text-[20px] font-semibold text-center' style={{fontFamily: 'Poppins, sans-serif'}}>Welcome back, {apiData?.username}</h1>
                  <p className=' text-[10px] font-medium text-center  text-[#96B7C5]' style={{fontFamily: 'Poppins, sans-serif'}}>Welcome back! Please enter your details.</p>
                </div>
                <div className=' flex flex-col items-center'>
                  <div className=' rounded-full border-2 border-[#439BC0] p-1 '>
                    <div className=' w-28 h-28 rounded-full overflow-hidden ' >
                      <img className=' object-cover object-center ' src={ apiData?.profile || Context} alt="context"  />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col gap-3'>
                  <input {...formik.getFieldProps('password')} className={`${formik.errors.password && formik.touched.password ? 'border-rose-500' : ''} w-[310px] p-2 text-[12px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} style={{fontFamily: 'Poppins, sans-serif'}} type="password" placeholder='Enter your password' />
                  {formik.errors.password && formik.touched.password?(
                  <span style={{ fontFamily: 'Poppins, sans-serif' }} className="text-xs px-2 text-red-500">
                    {formik.errors.password}
                  </span>
                  ):(
                  <></>
                  )}
                  <div >
                    <button type='submit' onSubmit={formik.handleSubmit} className='bg-[#439BC0] px-[115px] py-1 text-white font-medium rounded-sm hover:bg-[#3a87a8] duration-300 text-[14px] ' style={{fontFamily: 'Poppins, sans-serif'}}>Let&apos;s sign in</button>
                  </div>
                  <div className='flex flex-row gap-1'>
                    <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[#96B7C5] text-[9px]' >Forgot Password? </p>
                    <Link to='/recoverpassword'>
                      <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-rose-600 text-[9px] hover:underline duration-300 cursor-pointer'>recover now</p>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
    </>

  )
}
