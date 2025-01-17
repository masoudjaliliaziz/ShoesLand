import { authHooks } from "../../api/queryClinet";
import bell from "../../assets/bell.svg";
import { GoHeart } from "react-icons/go";
import user from "../../assets/user.svg";
import { Link } from "react-router-dom";

import Loading from '../../component/base/Loading'

function HeaderHome() {
  const { data, isLoading, isError } = authHooks.useWhoAmI()
  if (isLoading) return <Loading />
  return (
    <div>
      <div className="flex justify-between py-2 px-2 items-center">
        <div className="flex space-x-2">
          <div>
            <img src={user} className="size-10 bg-slate-300 p-1 rounded-full" />
          </div>
          <div className="flex flex-col text-sm ">
            <span className="text-slate-600">Good Morning 👋</span>
            {isError ?
              <span className="font-bold"></span> :
              <span className="font-bold">{data.username && data.username}</span>
            }
          </div>
        </div>
        <div>
          <button className="flex space-x-1">
            <Link to={"/#"}>
              <img src={bell} className="size-7 hover:stroke-orange-300" />
            </Link>
            <Link to={"/wishlist"}>
              <GoHeart className="size-7 hover:text-rose-300" />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderHome;
