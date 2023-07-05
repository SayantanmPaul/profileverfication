import React, {useState} from 'react'
import Context from '/unsplash.jpg';
import git from '../assets/Vector.png';
import useFetch from '../customhooks/fetch.hook';
import { useFormik } from 'formik';
import { profileValidate } from '../formikhooks/validate';
import convertToBase64 from '../formikhooks/img_convert';
import { Link, useNavigate } from 'react-router-dom';
import { LineWave } from 'react-loader-spinner'
import { updateUser } from '../utilities/helper';
import { Toaster, toast } from 'react-hot-toast';
export default function profile() {
  
  const navigate=useNavigate();
  const[file, setFile]= useState(null);

  // access user data
  const [{isLoading, apiData, serverError}]= useFetch();

  // formik hooks and input values
  const formik= useFormik({
    initialValues:{
      firstname: apiData?.firstname || '',
      lastname: apiData?.lastname || '',
      username: apiData?.username || '' ,
      githubid: apiData?.githubid || 'https://github.com/',
      profile: apiData?.profile || ''
    },
    validate: profileValidate,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async values=>{
      // access the profile image image or select the default one 
      values= Object.assign(values, {profile: file || apiData?.profile ||''})


      const updatSucess= updateUser(values);
      toast.promise(updatSucess,{
        loading: "updateing...",
        success: <b style={{fontSize: '11px'}}>updated successfully</b>,
        error: <b style={{fontSize: '11px'}}>username already exists</b>
      })
    }
  }, )  


  // image conversion
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };  

  // logout handler
  function userLogout(){
    localStorage.removeItem('token')
    navigate('/')
  }


  if(isLoading) return <div className=' flex h-screen items-center justify-center'> <LineWave height="100" width="100" color="#4fa94d" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} firstLineColor="" middleLineColor="" lastLineColor="" /></div>
  if(serverError) return <h1 style={{fontFamily:'Poppins, sans-serif'}} className='flex h-screen items-center justify-center text-xl text-rose-700'>{serverError.message}</h1>


  return (
    <div className="flex h-screen bg-cover overflow-hidden">
      <Toaster position='top-center' reverseOrder={false}/>
      <div className="w-full h-full flex ">
        <div className=" lg:block hidden" style={{ width: '60%' }}>
          <div className='flex flex-row items-center absolute gap-2 p-10 cursor-pointer' >
            <Link to={'https://github.com/SayantanmPaul/profileverfication'}>
              <img src={git} alt="branch" className='w-8' />
            </Link>
          </div>

          <form onSubmit={formik.handleSubmit} className='flex justify-center items-center h-full'>
            <div className=' flex flex-col gap-12'>
              <div className=' flex  flex-col gap-2'>
                <h1 className=' text-[27px] font-medium text-center' style={{fontFamily: 'Poppins, sans-serif'}}>Succesfully Logged in</h1>
                <p className=' text-xs font-medium text-center  text-[#96B7C5]' style={{fontFamily: 'Poppins, sans-serif'}}>You can still update your details</p>
              </div>
              <div className=' flex flex-col items-center'>
                <div className=' rounded-full border-2 border-[#439BC0] p-1'>
                  <div className=' w-32 h-32 rounded-full overflow-hidden'>
                  <label htmlFor='profile'>
                      <img className=' object-cover object-center bg-cover overflow-hidden bg-rea ' src={file || apiData?.profile || Context} alt="user image"  />
                      <input 
                      onChange={onUpload} 
                      type='file' 
                      id='profile' 
                      name='profile' 
                      className='hidden' 
                      />
                    </label>
                  </div>
                </div>
              </div>
                <div className='flex flex-col gap-3'>
                  <div className="flex gap-8" >
                    <input {...formik.getFieldProps('firstname')}
                    className={`${formik.errors.firstname && formik.touched.firstname ? 'border-rose-500' : ''} w-44 p-2 text-[14px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} 
                    style={{ fontFamily: 'Poppins, sans-serif' }} 
                    type="text" 
                    placeholder='First Name' 
                    />
                    <input {...formik.getFieldProps('lastname')}
                    className={`${formik.errors.lastname && formik.touched.lastname ? 'border-rose-500' : ''} w-44 p-2 text-[14px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} 
                    style={{ fontFamily: 'Poppins, sans-serif' }} 
                    type="text" 
                    placeholder='Last Name' 
                    />
                  </div>
                  <input
                    className={` cursor-not-allowed w-96 p-2 text-[14px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} 
                    style={{fontFamily: 'Poppins, sans-serif'}}  
                    type="text"
                    disabled={true}
                    placeholder={apiData?.email} 
                    />
                  <input {...formik.getFieldProps('username')}
                    className={`${formik.errors.username && formik.touched.username ? 'border-rose-500' : ''} w-96 p-2 text-[14px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} 
                    style={{fontFamily: 'Poppins, sans-serif'}}  
                    type="text"
                    placeholder={apiData?.username} 
                    />
                  {formik.errors.username && formik.touched.username?(
                    <span style={{ fontFamily: 'Poppins, sans-serif' }} className="text-xs px-2 text-red-500">
                      {formik.errors.username}
                    </span>
                    ):(
                    <></>
                    )}
                  <span style={{ fontFamily: 'Poppins, sans-serif' }}  className="text-xs px-2 text-blue-500">
                      you can still update your username
                  </span>
                  <input {...formik.getFieldProps('githubid')}
                    className={`${formik.errors.githubid && formik.touched.githubid ? 'border-rose-500' : ''} w-96 p-2 text-[14px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} 
                    style={{fontFamily: 'Poppins, sans-serif'}}  
                    type="text"
                    placeholder='GitHub ID' 
                    />
                    
                  <span style={{ fontFamily: 'Poppins, sans-serif' }}  className="text-xs px-2 text-blue-500">
                      you can still update your github profile
                  </span>
                  <div>  
                    <button type='submit' className='bg-blue-500  px-[143px] py-1 text-white font-medium rounded-sm hover:bg-blue-700  duration-500 ' style={{fontFamily: 'Poppins, sans-serif'}}>update now</button>
                  </div>
                  <div className='flex flex-row justify-center gap-1'>
                    <button onClick={userLogout} type='submit' className='bg-rose-500  px-[163px] py-1 text-white font-medium rounded-sm hover:bg-rose-700  duration-500 ' style={{fontFamily: 'Poppins, sans-serif'}}>log out</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        <div className="flex-grow bg-cover bg-no-repeat backdrop-blur-sm flex justify-center items-center" style={{backgroundImage: 'url(../../public/prof.jpg)'}}>
        {/* mobile or tablet view */}
        <div className='w-[92%] h-[85%] bg-white flex flex-col justify-center items-center lg:hidden' >
          <div className='flex flex-row items-center hover:underline underline-offset-2 duration-300 p-5 absolute top-0'>
            <Link to={'https://github.com/SayantanmPaul/profileverfication'}>
              <img src={git} alt="branch" className='w-5  ' />
            </Link>
          </div>
          <form onSubmit={formik.handleSubmit} className='flex justify-center items-center relative h-full'>
            <div className=' flex flex-col gap-9 '>
              <div className=' flex  flex-col gap-1'>
                <h1 className=' text-[20px] font-semibold text-center' style={{fontFamily: 'Poppins, sans-serif'}}>Succesfully Logged in</h1>
                <p className=' text-[10px] font-medium text-center  text-[#96B7C5]' style={{fontFamily: 'Poppins, sans-serif'}}>You can still update your details</p>
              </div>
              <div className=' flex flex-col items-center'>
                <div className=' rounded-full border-2 border-[#439BC0] p-1 '>
                  <div className=' w-28 h-28 rounded-full overflow-hidden ' >
                    <label htmlFor='profile1'>
                      <img className=' object-cover object-center ' src={file || apiData?.profile || Context} alt="user image"  />
                      <input onChange={onUpload} type='file' id='profile1' name='profile ' className=' hidden' />
                    </label>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <div className="flex gap-5">
                  <input 
                    {...formik.getFieldProps('firstname')} 
                    className={`${formik.errors.firstname && formik.touched.firstname ? 'border-rose-500' : ''} w-36 p-2 text-[12px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} 
                    style={{fontFamily: 'Poppins, sans-serif'}} 
                    type="text" 
                    placeholder='First Name' 
                    />
                  <input  
                    {...formik.getFieldProps('lastname')} 
                    className={`${formik.errors.lastname && formik.touched.lastname ? 'border-rose-500' : ''} w-36 p-2 text-[12px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} 
                    style={{fontFamily: 'Poppins, sans-serif'}} 
                    type="text" 
                    placeholder='Last Name' 
                    />
                </div>
                <input 
                  {...formik.getFieldProps('email')} 
                  disabled={true} 
                  className={`${formik.errors.password && formik.touched.password ? 'border-rose-500' : ''} w-[310px] p-2 text-[12px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm cursor-not-allowed `} 
                  style={{fontFamily: 'Poppins, sans-serif'}} 
                  type="email" 
                  placeholder={apiData?.email} 
                />
                <input
                  {...formik.getFieldProps('username')} 
                  className={`${formik.errors.password && formik.touched.password ? 'border-rose-500' : ''}  w-[310px] p-2 text-[12px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} 
                  style={{fontFamily: 'Poppins, sans-serif'}} 
                  type='text' 
                  placeholder={apiData?.username} 
                  />
                {formik.errors.username && formik.touched.username?(
                <span style={{ fontFamily: 'Poppins, sans-serif' }} className="text-xs px-2 text-red-500">
                  {formik.errors.username}
                </span>
                ):(
                <></>
                )}
                <span style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[10px] px-1 text-blue-500">
                  you can still update your username
                </span>
                <input 
                  {...formik.getFieldProps('githubid')} 
                  className={`${formik.errors.password && formik.touched.password ? 'border-rose-500' : ''} w-[310px] p-2 text-[12px] border bg-[#e6e2e2] placeholder:opacity-70 rounded-sm`} 
                  style={{fontFamily: 'Poppins, sans-serif'}} 
                  type="text" 
                  placeholder='Github ID' 
                  />
                <span style={{ fontFamily: 'Poppins, sans-serif' }} className="text-[10px] px-1 text-blue-500">
                  you can still update your github profile
                </span> 
                <button 
                  type='submit' 
                  className='bg-blue-500 px-[110px] py-1 text-white font-medium rounded-sm hover:bg-blue-700 duration-300 text-[14px] ' 
                  style={{fontFamily: 'Poppins, sans-serif'}}>
                  Update Now
                </button>
                <div className='flex flex-row gap-1 justify-center'>
                  <button 
                    type='submit' 
                    onClick={userLogout}
                    className='bg-rose-500 px-[132px] py-1 text-white font-medium rounded-sm hover:bg-rose-700 duration-300 text-[14px] ' 
                    style={{fontFamily: 'Poppins, sans-serif'}}>
                    log out
                  </button>
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
