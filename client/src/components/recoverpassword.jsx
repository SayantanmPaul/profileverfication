import React, { useEffect, useState } from 'react';
import git from '../assets/Vector.png';
import { Toaster, toast } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { Link, useNavigate } from 'react-router-dom';
import { generateOTP, verifyOTP } from '../utilities/helper';

export default function RecoverPassword() {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState('');

  // generate otp func
  useEffect(() => {
    generateOTP(username)
      .then((OTP) => {
        const sentPromise=OTP
        ?Promise.resolve('otp sent to your mail')
        :Promise.reject('failed to send otp')
        toast.promise(sentPromise,{
          loading: 'sending otp',
          success: <b style={{fontSize: '11px'}}>otp sent to your email</b>,
          error: <b style={{fontSize: '11px'}}> failed to send</b>
        })
      });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    // successful verification navigate to reset route
    try {
      const { successStatus } = await verifyOTP({ username, code: OTP });
      if (successStatus !== 201) {
        toast.success(successStatus);
        return navigate('/reset');
      }
    } catch (error) {
      return toast.error('wrong otp check again');
    }
  }

  // resend otp func
  function resendOTP() {
    const sentPromise = generateOTP(username);
    toast.promise(sentPromise, {
      loading: 'Sending email again',
      success: <b style={{fontSize: '11px'}}>Sent email successfully</b>,
      error: <b style={{fontSize: '11px'}}>Try again later</b>,
    });
  }

  return (
    <div className="flex h-screen bg-cover overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full h-full flex ">
        <div className="lg:block hidden" style={{ width: '60%' }}>
          <div className="flex flex-row items-center absolute p-11 cursor-pointer">
            <Link to={'https://github.com/SayantanmPaul/profileverfication'}>
              <img src={git} alt="branch" className="w-7" />
            </Link>
          </div>

          <div className="flex flex-col gap-3 justify-center items-center h-full">
            <form onSubmit={onSubmit} className="flex flex-col gap-14">
              <div className="flex flex-col gap-2">
                <h1 className="text-[27px] font-medium text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Recover Your Account
                </h1>
                <p
                  className="text-xs font-medium text-center  text-[#96B7C5]"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Enter OTP to recover password
                </p>
              </div>

              <div className="input flex flex-col gap-3">
                <p className="text-[#96B7C5] text-[10px] leading-3 font-medium px-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Enter 6-digit OTP sent to your email address
                </p>
                <input
                  onChange={(e) => setOTP(e.target.value)}
                  className="w-96 p-2 text-[14px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  type="text"
                  placeholder="OTP"
                />
                <div>
                  <button
                    type="submit"
                    className="bg-rose-400 px-[140px] py-1 text-white font-medium rounded-sm hover:bg-rose-600 duration-300"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Recover now
                  </button>
                </div>
              </div>
            </form>
            <div className="flex flex-row justify-center gap-1">
              <p style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[#96B7C5] text-xs">
                Can&apos;t get OTP?
              </p>
              <button
                onClick={resendOTP}
                style={{ fontFamily: 'Poppins, sans-serif' }}
                className="text-rose-600 text-xs hover:underline duration-300 cursor-pointer"
              >
                Resend now
              </button>
            </div>
          </div>
        </div>
        <div className="flex-grow bg-cover bg-no-repeat backdrop-blur-sm flex justify-center items-center" style={{ backgroundImage: 'url(/unsplash2.jpg)' }}>
        {/* mobile and tablet view */}

        <div className="w-[92%] h-[60%] bg-white flex flex-col justify-center items-center absolute lg:hidden">
          <div className="flex flex-row items-center top-5 relative">
            <Link to={'https://github.com/SayantanmPaul/profileverfication'}>
              <img src={git} alt="branch" className="w-5" />
            </Link>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center h-full">
            <form onSubmit={onSubmit} className="flex flex-col gap-10">
              <div className="flex flex-col gap-1">
                <h1 className="text-[20px] font-semibold text-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Recover Your Account
                </h1>
                <p
                  className="text-[10px] font-medium text-center  text-[#96B7C5]"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Enter OTP to recover password
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[#96B7C5] text-[10px] leading-3 font-medium px-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Enter 6-digit OTP sent to your email address
                </p>
                <input
                  onChange={(e) => setOTP(e.target.value)}
                  className="w-[310px] p-2 text-[12px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  placeholder="OTP"
                />
                <div>
                  <button
                    type='submit'
                    className="bg-rose-400 px-[110px] py-1 text-white font-medium rounded-sm hover:bg-rose-600 duration-300 text-[14px]"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Recover now
                  </button>
                </div>
              </div>
            </form>
            <div className="flex flex-row justify-center gap-1">
              <p style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[#96B7C5] text-[9px]">
                Can&apos;t get OTP?
              </p>
              <button
                onClick={resendOTP}
                style={{ fontFamily: 'Poppins, sans-serif' }}
                className="text-rose-600 text-[9px] hover:underline duration-300 cursor-pointer"
              >
                Resend again
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
