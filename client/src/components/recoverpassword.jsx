import React from 'react'
import git from '../assets/Vector.png';
import {Toaster} from 'react-hot-toast';
import { passwordValidate} from '../formikhooks/validate';
import {Link } from 'react-router-dom';

export default function recoverpassword() {
  
  return (
    <div className="flex h-screen bg-cover overflow-hidden">
      <div className="w-full h-full flex ">
        <div className=" lg:block hidden" style={{ width: '60%' }}>
          <div className='flex flex-row items-center absolute p-11 cursor-pointer'>
            <img src={git} alt="branch" className=' w-7' />
          </div>

          <form className='flex justify-center items-center h-full'>
            <div className=' flex flex-col gap-14 '>
              <div className=' flex  flex-col gap-2'>
                <h1 className=' text-[27px] font-medium text-center' style={{fontFamily: 'Poppins, sans-serif'}}>Recover Your Account</h1>
                <p className=' text-xs font-medium text-center  text-[#96B7C5]' style={{fontFamily: 'Poppins, sans-serif'}}>Enter OTP to recover password</p>
              </div>
              
              <div className=' input flex flex-col gap-3'>
                <input  className={` w-96 p-2 text-[14px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} style={{fontFamily: 'Poppins, sans-serif'}} type='password' placeholder='Enter your username' />
                <p className=' text-[#96B7C5] text-[10px] leading-3 font-medium px-2 ' style={{fontFamily: 'Poppins, sans-serif'}}>Enter  6 digit OTP sent your  email address</p>
                <input  className={`w-96 p-2 text-[14px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} style={{fontFamily: 'Poppins, sans-serif'}} type='password' placeholder='OTP' />
                <div >  
                  <button onSubmit={passwordValidate} className='bg-rose-400 px-[140px] py-1 text-white font-medium rounded-sm hover:bg-rose-600 duration-300 ' style={{fontFamily: 'Poppins, sans-serif'}}>Recover now</button>
                </div>
                <div className='flex flex-row justify-center gap-1'>
                  <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[#96B7C5] text-xs' >Can&apos;t get otp? </p> 
                  <button style={{fontFamily: 'Poppins, sans-serif'}} className='text-rose-600 text-xs hover:underline duration-300 cursor-pointer'>Resend now</button>
                </div>
              </div>      
            </div>
          </form>

        </div>
        <div className="flex-grow bg-cover bg-no-repeat backdrop-blur-sm flex justify-center items-center"  style={{backgroundImage: 'url(../../public/unsplash2.jpg)'}}>
        {/* mobile and tablet view */}
        
          <div className='w-[92%] h-[60%] bg-white flex flex-col justify-center items-center absolute lg:hidden'>
            <Toaster position='top-center' reverseOrder={false}></Toaster>

            <div className='flex flex-row items-center top-5 relative'>
              <img src={git} alt="branch" className=' w-5' />
            </div>
            <form className='flex justify-center items-center h-full'>
              <div className=' flex flex-col gap-10 '>
                <div className=' flex  flex-col gap-1'>
                  <h1 className=' text-[20px] font-semibold text-center' style={{fontFamily: 'Poppins, sans-serif'}}>Recover Your Account</h1>
                  <p className=' text-[10px] font-medium text-center  text-[#96B7C5]' style={{fontFamily: 'Poppins, sans-serif'}}>Enter OTP to recover password</p>
                </div>
                <div className='flex flex-col gap-4'>
                  <input  className={` w-[310px] p-2 text-[12px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} style={{fontFamily: 'Poppins, sans-serif'}} type="password" placeholder='Enter your username' />
                  <p className=' text-[#96B7C5] text-[10px] leading-3 font-medium px-2 ' style={{fontFamily: 'Poppins, sans-serif'}}>Enter  6 digit OTP sent your  email address</p>
                  <input className={` w-[310px] p-2 text-[12px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} style={{fontFamily: 'Poppins, sans-serif'}} type="password" placeholder='OTP' />
                  <div >
                    <button className='bg-rose-400 px-[110px] py-1 text-white font-medium rounded-sm hover:bg-rose-600 duration-300 text-[14px] ' style={{fontFamily: 'Poppins, sans-serif'}}>Recover now</button>
                  </div>
                  <div className='flex flex-row justify-center gap-1'>
                    <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[#96B7C5] text-[9px]' >Can&apos;t get otp? </p>
                    <Link to='/rcoverpassword'>
                      <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-rose-600 text-[9px] hover:underline duration-300 cursor-pointer'>Resend now</p>
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
