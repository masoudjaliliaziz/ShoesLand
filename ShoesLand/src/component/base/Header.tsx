import { Link, Outlet } from "react-router-dom";

function Header() {
  return (
    <>
      <Outlet />

      <div className="bg-red-500">footer</div>
    </>
  );
}

export default Header;
