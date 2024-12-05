import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'





function App() {
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
    return (
      <>
        {count==1 && <>
            <div className="flex justify-center items-between">
              <img src="img/Vector.png" alt=""  className="bg-black w-[60px] h-[60px] rounded-full p-2"/>
              <h1 className='text-3xl'>Shoesea</h1>
            </div>
            <div className='mt-[80%]'>
              <img src="img/spinner.png" alt="" className='animate-spin transition-[2s]'/>
            </div>
          </>
          }
          {count == 2 && 
          <h1>Hi</h1>
          }
      </>
    )

}

export default App;
