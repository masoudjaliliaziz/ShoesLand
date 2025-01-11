import { useState, useEffect } from "react";

import logo from "../../public/img/Vectorwhite.png";
import spinner from "../../public/img/spinner.svg";
import { Link } from "react-router-dom";

function Onboarding() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      setCount(2);
    }, 3000);
  }, []);
  console.log(count);

  function nextPage() {
    setCount(count + 1);
  }

  function prevPage() {
    setCount(count - 1);
  }

  return (
    <>
      {/* //firstpage */}

      {count == 1 && (
        <>
          <div className=" w-full h-screen flex justify-center items-center content-center">
            <div className="fixed top-64 flex justify-center items-center content-center space-x-3">
              <img
                src={logo}
                className="bg-black w-12 h-12 rounded-full py-1 px-2"
              />
              <h1 className="font-bold text-6xl">Shoea</h1>
            </div>
          </div>
          <div className="items-center flex justify-center content-center">
            <img
              src={spinner}
              className="w-12 fixed bottom-32 animate-spin transition-[2s]"
            />
          </div>
        </>
      )}

      {/* //second page */}
      {count == 2 && (
        <>
          <div
            onClick={nextPage}
            className='z-0 bg-[url("img/welcombanner.png")] bg-cover bg-no-repeat w-[428px] h-[100vh] flex flex-col items-start justify-end'
          >
            <div className="z-10 w-full h-screen opacity-40 bg-gradient-to-r from-zinc-600 via-zinc-600 to-zinc-500">
              <div className="px-4 flex flex-col gap-6"></div>
            </div>
          </div>
          <div className="z-20 space-y-1 opacity-100 absolute bottom-20 ml-5 flex flex-col items-start justify-end">
            <h2 className="text-white text-left font-bold text-3xl">
              Welcome to 👋
            </h2>
            <div className="space-y-2">
              <h1 className="text-white font-extrabold text-7xl text-left">
                Shoea
              </h1>
              <p className="text-white text-xl font-semibold w-96 text-left">
                The best sneakers & shoes e-commerse app of the century for your
                fashion needs!
              </p>
            </div>
          </div>
        </>
      )}
      {/* //third page */}
      {count == 3 && (
        <>
          <div className="w-full h-screen flex flex-col justify-start items-center gap-8">
            <div className="items-center flex justify-center content-center">
              <img
                src="img/slide1.png"
                className="w-full h-[563px] items-center"
              />
            </div>
            <div className="items-center flex justify-center content-center px-2">
              <span className="text-slate-950 text-3xl font-bold text-center">
                We provide high quality products just for you
              </span>
            </div>
            <div className="flex justify-center items-center flex-col space-y-12 fixed bottom-5">
              <img src="img/carosel1.png" />
              <button
                onClick={nextPage}
                className="bg-black cursor-pointer text-xl w-[350px] py-2 text-white rounded-2xl"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* forth page */}
      {count == 4 && (
        <>
          <div className="w-full h-screen flex flex-col justify-start items-center gap-8">
            <div className="items-center flex justify-center content-center">
              <img
                src="img/slide2.png"
                className="w-full h-[563px] items-center"
              />
            </div>
            <div className="items-center flex justify-center content-center px-2">
              <span className="text-slate-950 text-3xl font-bold text-center">
                Your satisfaction is our number one periority
              </span>
            </div>

            <div className="flex justify-center items-center flex-col space-y-12 fixed bottom-5">
              <img src="img/carosel2.png" />
              <button
                onClick={nextPage}
                className="bg-black cursor-pointer text-xl w-[350px] py-2 text-white rounded-2xl"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* fifth page */}
      {count == 5 && (
        <>
          <div className="w-full h-screen flex flex-col justify-start items-center gap-8">
            <div className="items-center flex justify-center content-center">
              <img
                src="img/slide3.png"
                className="w-full h-[563px] items-center"
              />
            </div>
            <div className="items-center flex justify-center content-center px-2">
              <span className="text-slate-950 text-3xl font-bold text-center">
                Let’s fulfill your fashion needs with shoearight now!
              </span>
            </div>

            <div className="flex justify-center items-center flex-col space-y-12 fixed bottom-5">
              <img src="img/carosel3.png" />
              <Link to="/">
                <button
                  onClick={nextPage}
                  className="bg-black cursor-pointer text-xl w-[350px] py-2 text-white rounded-2xl"
                >
                  Next
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Onboarding;
