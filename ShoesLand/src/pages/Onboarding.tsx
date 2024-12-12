import { useState, useEffect } from "react";


function Onboarding (){
    const [count, setCount] = useState(1)
  useEffect(() => {
    setTimeout(() => {
      setCount(2);
    }, 5000);
  },[]);
console.log(count)

  function nextPage (){
    setCount(count + 1)
  }

  function prevPage(){
    setCount(count - 1)
  }

  return(
    <>  
    {/* //firstpage */}
        {count==1 && <>
            <div className="flex justify-center items-between">
              <img src="img/Vector.png" alt=""  className="bg-black w-[60px] h-[60px] rounded-full p-2"/>
              <h1 className='text-3xl'>Shoea</h1>
            </div>
            <div className='mt-[80%]'>
              <img src="img/spinner.png" alt="" className='animate-spin transition-[2s]'/>
            </div>
          </>
          }

          {/* //second page */}
          {count == 2 && <>
          
            <div onClick={nextPage} className='bg-[url("img/welcombanner.png")] bg-cover bg-no-repeat w-[428px] h-[100vh] flex flex-col items-start justify-end'>
              <div className='px-4 flex flex-col gap-6 mt-[100%]'>
                <h2 className='text-white text-left font-bold text-3xl'>Welcome to 👋</h2>
                <h1 className='text-white font-extrabold text-7xl text-left'>Shoea</h1>
                <p className='text-white text-lg text-left'>The best sneakers & shoes e-commerse app of the century for your fashion needs!</p>
              </div>
            </div>
          </>
          }
          {/* //third page */}
          {count == 3 && 
          <>
            <div className='w-[428px] flex flex-col justify-start items-center gap-8 mt-0'>
              <div className='mt-[-60%]'>
                <img onClick={prevPage} src="img/back-w.png" className='absolute px-4 mx-4 top-[1%] w-[60px] cursor-pointer' alt="" />
                <img src="img/slide1.png" alt="" />
              </div>
              <div>
                <span className='text-black text-4xl font-bold'>We provide high quality products just for you</span>
              </div>
              <div>
                <img src="img/carosel1.png" alt="" />
              </div>
              <div className='flex justify-center items-center'>
                <button onClick={nextPage} className='bg-black cursor-pointer text-xl w-[350px] py-2 text-white rounded-2xl'>Next</button>
              </div>
            </div>
          </>
          }

          {/* forth page */}
          {count == 4 &&
          <>
            <div className='w-[428px] flex flex-col justify-start items-center gap-8 mt-0'>
              <div className='mt-[-60%]'>
                <img onClick={prevPage} src="img/back-w.png" className='absolute px-4 mx-4 top-[1%] w-[60px] cursor-pointer' alt="" />
                <img src="img/slide2.png" alt="" />
              </div>
              <div>
                <span className='text-black text-4xl font-bold'>Your satisfaction is our number one periority</span>
              </div>
              <div>
                <img src="img/carosel2.png" alt="" />
              </div>
              <div className='flex justify-center items-center'>
                <button onClick={nextPage} className='bg-black cursor-pointer text-xl w-[350px] py-2 text-white rounded-2xl'>Next</button>
              </div>
            </div>
          </>
          }

          {/* fifth page */}
           {count == 5 &&
          <>
            <div className='w-[428px] flex flex-col justify-start items-center gap-8 mt-0'>
              <div className='mt-[-60%]'>
                <img onClick={prevPage} src="img/back-w.png" className='absolute px-4 mx-4 top-[1%] w-[60px] cursor-pointer' alt="" />
                <img src="img/slide3.png" alt="" />
              </div>
              <div>
                <span className='text-black text-4xl font-bold'>Let’s fulfill your fashion needs with shoearight now!</span>
              </div>
              <div>
                <img src="img/carosel3.png" alt="" />
              </div>
              <div className='flex justify-center items-center'>
                <button onClick={nextPage} className='bg-black cursor-pointer text-xl w-[350px] py-2 text-white rounded-2xl'>Get started</button>
              </div>
            </div>
          </>
          }
      </>
  )
}

export default Onboarding