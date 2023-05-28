import React from 'react';
import Context from '../../public/unsplash.jpg';
import git from '../../public/Vector.png';

export default function Username() {
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

          <form className='flex justify-center items-center h-full'>
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
              <div className='flex flex-col items-center gap-3'>
                <input className=' w-96 p-2 text-[14px] bg-[#e6e2e2] placeholder:opacity-70 rounded-sm' style={{fontFamily: 'Poppins, sans-serif'}} type="text" placeholder='Enter your username' />
                <div >
                  <button className='bg-[#439BC0] px-[148px] py-1 text-white font-medium rounded-sm hover:bg-[#3a87a8] duration-300 ' style={{fontFamily: 'Poppins, sans-serif'}}>Let&apos;s sign in</button>
                </div>
                <div className='flex flex-row gap-1'>
                  <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-[#96B7C5] text-xs' >Don&apos;t have an account? </p>
                  <p style={{fontFamily: 'Poppins, sans-serif'}} className='text-black text-xs hover:underline duration-300'>Sign up for free</p>
                </div>
              </div>
            </div>
          </form>

        </div>
        <div className="flex-grow bg-cover bg-no-repeat " style={{backgroundImage: "url(../../public/unsplash.jpg)"}}>
          </div>
      </div>
    </div>
  );
}
