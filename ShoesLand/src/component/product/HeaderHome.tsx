import bell from "../../assets/bell.svg";
import heartwhite from "../../assets/HeartNone.svg";
import user from "../../assets/user.svg";
import { Link } from "react-router-dom";

function HeaderHome() {
  return (
    <div>
      <div className="flex justify-between py-2 px-2 items-center">
        <div className="flex space-x-2">
          <div>
            <img src={user} className="size-10 bg-slate-300 p-1 rounded-full" />
          </div>
          <div className="flex flex-col text-sm font-serif">
            <span className="text-slate-600">Good Morning 👋</span>
            <span className="font-bold">name</span>
          </div>
        </div>
        <div>
          <button className="flex space-x-1">
            <Link to={"/#"}>
              <img src={bell} className="size-7 hover:stroke-orange-300" />
            </Link>
            <Link to={"/wishlist"}>
              <img src={heartwhite} className="size-7 hover:bg-rose-300" />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderHome;
