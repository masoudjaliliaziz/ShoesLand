import { Link } from 'react-router-dom'
import { productHooks } from '../../api/queryClinet';


export function BrandNav({ filter, dispatch }) {

  const { data, isLoading } = productHooks.useFetchBrands()

  if (isLoading) return <div>loading...</div>
  console.log(data)
  console.log(dispatch)
  return (

    <>
      <div className=" mostContainer w-full flex flex-col items-center  gap-5 h-1/6">
        <div className="w-full flex flex-row justify-between items-center text-start left-0">
          <div className="font-bold leading-5 flex justify-item-center space-x-1">
            {/* pageState == "popular" && (
              <svg
                onClick={() => navigate(-1)}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="size-7 cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h15"
                />
              </svg>
            )*/}
            <span className="text-lg">Most Popular</span>
          </div>
          <Link to="/popular">
            <h1 className="font-semibold MostPopularpage cursor-pointer leading-5 text-base hover:text-slate-500">
              See All
            </h1>
          </Link>
        </div>
      </div>

      <div
        className="h-10 justify-content-start  scroll-pr-10
        w-full flex flex-row gap-1 overflow-x-scroll snap-x
         [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
        
        "
      >
        <div>
          <button
            key={"all"}
            className="font-bold  snap-start leading-5  text-xs h-10 flex 
             justify-center items-center px-4 py-1.5 border-2 border-[#343A40]
              rounded-3xl cursor-pointer hover:bg-slate-700 hover:text-white
          
              "
            onClick={() => dispatch({ type: "brand", value: "" })}
          >
            All
          </button>
        </div>
        {data.map((item) => {
          return (
            <div key={item.id}>
              <button
                className="font-bold snap-start leading-5 h-10  text-xs flex 
                justify-center items-center px-4 py-1.5 border-2 
                border-[#343A40] rounded-3xl cursor-pointer hover:bg-slate-700
                 hover:text-white"
                onClick={() => dispatch({ type: "brand", value: item.name })}
              >
                {item.name}
              </button>
            </div>
          );
        })}
      </div>
    </>



  )
}
