import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ApiContext } from "../base/Api";

export function ProductDetail() {
  const [count, setCount] = useState(0);
  const apiContext = useContext(ApiContext);
  const colors = [
    "bg-rose-600",
    "bg-emerald-600",
    "bg-yellow-600",
    "bg-gray-600",
  ];
  const { id } = useParams();
  let prodcut;
  if (apiContext) {
    prodcut = apiContext.data.find((product) => product.id == Number(id));
  }

  return (
    <div className="w-full h-screen">
      <div className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>
        <div>
        <img src={prodcut?.images} className="h-1/8"/>
        <div>-</div>
        </div>
        
      </div>

      <div className="w-full h-1/4 relative mb-3 after:absolute pb-3 after:w-full after:h-full  after:top-0 after:left-0 after:border-b-2 after:border-b-solid after:border-b-slate-100 after:pointer-events-none">
        <div>
          <div>
            <h1>{prodcut?.title}</h1>
            <div>
              <p>{prodcut?.order} sold</p>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <p>4.3(5,389 reviews)</p>
              </div>
            </div>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="w-full h-1/4 relative mb-3 after:absolute pb-3 after:w-full after:h-full  after:top-0 after:left-0 after:border-b-2 after:border-b-solid after:border-b-slate-100 after:pointer-events-none">
        <div>
          <h3>Description</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit ab
            dicta vitae voluptatum nisi delectus ipsam, asperiores in quas
            veritatis officia, numquam necessitatibus aliquam velit
            voluptatibus. Odio quibusdam architecto repellat.
          </p>
        </div>
        <div>
          <div>
            <h3>Size</h3>
            <ul>
              {prodcut?.size.map((sizes, index) => (
                <li
                  className="py-1 px-2 rounded-full inline border-2 border-slate-800"
                  key={index}
                >
                  {sizes}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Color</h3>
            <ul>
              {prodcut?.color.map((colors, index) => (
                <li
                  className={`bg-${colors}-600 py-2 px-5 rounded-full inline `}
                  key={index}
                ></li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h3>Quantity</h3>
          <div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </div>
            <p>{count}</p>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h3>Total price</h3>
          <h2>${(prodcut?.price || 0) * count}.00</h2>
        </div>
        <div className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <h3>Add to Cart</h3>
        </div>
      </div>
    </div
    >
  );
}
