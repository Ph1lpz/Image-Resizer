import ThemeController from "../themController/ThemeController";
import { PiFlowerTulip } from "react-icons/pi";
import { IoImages } from "react-icons/io5";
import { PiResizeBold } from "react-icons/pi";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <a onClick={() => window.location.reload()} className="btn btn-ghost text-xl">
          <PiFlowerTulip className=" text-3xl" />
          Pixel Flow
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal items-center">
          <li className="max-sm:hidden">
            <Link to={'/'}>
              <PiResizeBold className="text-xl" />
              Resize
            </Link>
          </li>
          <li className="max-sm:hidden">
            <Link to={'/gallery'}>
              <IoImages  />
              Gallery
            </Link>
          </li>
          <li>
            <details className=" sm:hidden">
              <summary>Menu</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <Link to={'/gallery'}>
                    <IoImages  />
                    Gallery
                 </Link>
                </li>
                <li>
                  <Link to={'/'}>
                  <PiResizeBold className="text-xl" />
                    Resize
                  </Link>
                </li>
              </ul>
            </details>
          </li>
          <ThemeController />
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
