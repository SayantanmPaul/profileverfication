import React from 'react'
import Context from '/unsplash.jpg';
import git from '../assets/Vector.png';
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { passwordValidate} from '../formikhooks/validate';
import { useLocation, Link, useNavigate } from 'react-router-dom';

export default function password() {
  const location=useLocation();
  const navigate=useNavigate();
  const {username}=location.state;

  {/* formik meesage prints */}
  
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: passwordValidate ,
    onSubmit: async (values) => {
      console.log(values);

      {/*user shouldn't able to go o password comp if formik condition dosn't meets */}

      if(formik.isValid){
        navigate('/profile');
      }else[
      ]
    },
  });

  return (
    <div className="flex h-screen bg-cover overflow-hidden">
      <div className="w-full h-full flex ">
        <div className=" lg:block hidden" style={{ width: '60%' }}>
          <div className='flex flex-row items-center absolute gap-2 p-10 cursor-pointer'>
            <img src={git} alt="branch" className='w-8' />
            <div>
              <h1 style={{fontFamily: 'Barlow Condensed, sans-serif'}} className=' text-4xl font-semibold text-[#B799FF] '>Project UX..</h1>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className='flex justify-center items-center h-full'>
            <div className=' flex flex-col gap-12 '>
              <div className=' flex  flex-col gap-2'>
                <h1 className=' text-[27px] font-medium text-center' style={{fontFamily: 'Poppins, sans-serif'}}>Welcome back, {username}</h1>
                <p className=' text-xs font-medium text-center  text-[#96B7C5]' style={{fontFamily: 'Poppins, sans-serif'}}>Welcome back! Please enter your details.</p>
              </div>
              <div className=' flex flex-col items-center'>
                <div className=' rounded-full border-2 border-[#439BC0] p-1 '>
                  <div className=' w-32 h-32 rounded-full overflow-hidden ' >
                    <img className=' object-cover object-center ' src={Context} alt="context"  />
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
                  <button onSubmit={passwordValidate} className='bg-[#439BC0] px-[146px] py-1 text-white font-medium rounded-sm hover:bg-[#3a87a8] duration-300 ' style={{fontFamily: 'Poppins, sans-serif'}}>Let&apos;s sign in</button>
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
                  <h1 className=' text-[20px] font-semibold text-center' style={{fontFamily: 'Poppins, sans-serif'}}>Welcome back, {username}</h1>
                  <p className=' text-[10px] font-medium text-center  text-[#96B7C5]' style={{fontFamily: 'Poppins, sans-serif'}}>Welcome back! Please enter your details.</p>
                </div>
                <div className=' flex flex-col items-center'>
                  <div className=' rounded-full border-2 border-[#439BC0] p-1 '>
                    <div className=' w-28 h-28 rounded-full overflow-hidden ' >
                      <img className=' object-cover object-center ' src={Context} alt="context"  />
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
                    <button onSubmit={formik.handleSubmit} className='bg-[#439BC0] px-[115px] py-1 text-white font-medium rounded-sm hover:bg-[#3a87a8] duration-300 text-[14px] ' style={{fontFamily: 'Poppins, sans-serif'}}>Let&apos;s sign in</button>
                  </div>
                  <div className='flex flex-row gap-1'>
                    <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[#96B7C5] text-[9px]' >Forgot Password? </p>
                    <Link to='/rcoverpassword'>
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

  )
}
