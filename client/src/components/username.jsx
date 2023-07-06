import React from 'react';
import Context from '../../public/unsplash.jpg';
import git from '../assets/Vector.png';
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameVaildate } from '../formikhooks/validate';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAuthStore} from '../store/store.js';


export default function Username() {

  // update user value to the store
  const setUsername= useAuthStore(state=>state.setUsername);
  
  const history = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validateOnBlur: false,
    validateOnChange: false,
    validate: usernameVaildate,
    onSubmit: async (values) => {

      setUsername(values.username)
      //  navigate to password comp
      if (formik.isValid) {
        history('/password',{state: {username:values.username}});
      }
    },
  });


  return (
    <div className="flex h-screen bg-cover overflow-hidden">
      <div className="w-full h-full flex ">
        <div className=" lg:block hidden" style={{ width: '60%' }}>
          <div className='flex flex-row items-center absolute gap-2 p-10 cursor-pointer'>
            <Link to={'https://github.com/SayantanmPaul/profileverfication'}>
              <img src={git} alt="branch" className='w-8' />
            </Link>
          </div>

          <form onSubmit={formik.handleSubmit} className='flex justify-center items-center h-full'>
            <div className=' flex flex-col gap-12 '>
              <div className=' flex  flex-col gap-2'>
                <h1 className=' text-[27px] font-medium text-center' style={{fontFamily: 'Poppins, sans-serif'}}>Welcome back, User</h1>
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
                <input {...formik.getFieldProps('username')} className={`${formik.errors.username && formik.touched.username ? 'border-rose-500' : ''}  w-96 p-2 text-[14px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} style={{fontFamily: 'Poppins, sans-serif'}} type="text" placeholder='Enter your username' />
                {formik.errors.username && formik.touched.username?(
                  <span style={{ fontFamily: 'Poppins, sans-serif' }} className="text-xs px-2 text-red-500">
                    {formik.errors.username}
                  </span>
                ):(
                <></>
                )}
                <div >  
                  <button type='submit' onSubmit={formik.handleSubmit} className='bg-[#439BC0] px-[128px] py-1 text-white font-medium rounded-sm hover:bg-[#3a87a8] duration-300 ' style={{fontFamily: 'Poppins, sans-serif'}} >Let&apos;s get started  </button>
                </div>
                <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[#96B7C5] text-center text-xs' >Don&apos;t remember your username? check your mail :{')'} </p>
                <div className='flex flex-row justify-center gap-1'>
                  <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[#96B7C5] text-xs' >Don&apos;t have an account? </p>
                  <Link to='/register'>
                    <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-black text-xs hover:underline duration-300 cursor-pointer'>Sign up for free</p>
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
              <Link to={'https://github.com/SayantanmPaul/profileverfication'}>
                <img src={git} alt="branch" className='w-5  ' />
              </Link>
            </div>
            <form onSubmit={formik.handleSubmit} className='flex justify-center items-center h-full'>
              <div className=' flex flex-col gap-9 '>
                <div className=' flex  flex-col gap-1'>
                  <h1 className=' text-[20px] font-semibold text-center' style={{fontFamily: 'Poppins, sans-serif'}}>Welcome back, User</h1>
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
                  <input {...formik.getFieldProps('username')} className=' w-[310px] p-2 text-[12px] bg-[#e6e2e2] placeholder:opacity-70 rounded-sm' style={{fontFamily: 'Poppins, sans-serif'}} type="text" placeholder='Enter your username' />
                  {formik.errors.username && formik.touched.username?(
                  <span style={{ fontFamily: 'Poppins, sans-serif' }} className="text-xs px-2 text-red-500">
                    {formik.errors.username}
                  </span>
                ):(
                <></>
                )}
                  <div >
                    <button type='submit' onSubmit={usernameVaildate} className='bg-[#439BC0] px-[100px] py-1 text-white font-medium rounded-sm hover:bg-[#3a87a8] duration-300 text-[14px] ' style={{fontFamily: 'Poppins, sans-serif'}}>Let&apos;s get started </button>
                  </div>
                  <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[#96B7C5] text-center text-[9px]' >Don&apos;t remember your username? check your mail :{')'} </p>
                  <div className='flex flex-row justify-center gap-1'>
                    <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[#96B7C5] text-[10px]' >Don&apos;t have an account? </p>
                    <Link to='/register'>
                      <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-black text-[10px] hover:underline duration-300 cursor-pointer'>Sign up for free</p>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
