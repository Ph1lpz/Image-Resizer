import { LuPaintbrush } from "react-icons/lu";
import { useEffect } from "react";

import { themeChange } from "theme-change";
function ThemeController() {


  useEffect(() => {
      themeChange(false);
  }, []);
  return (
    <main className="flex justify-end">
      <div className="dropdown dropdown-end ">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1"
        >
          <LuPaintbrush className="text-2xl" />
        </div>
          <ul className="dropdown-content menu bg-base-300 font-semibold rounded-box z-[1] w-52 p-2 shadow">
            <li>
              <button
                data-set-theme="cupcake" // Changes theme to "light"
                className="focus:bg-neutral focus:text-neutral-content"
              >
                Default
              </button>
            </li>
            <li>
              <button
                data-set-theme="dark" // Changes theme to "dark"
                className="focus:bg-neutral focus:text-neutral-content"
              >
                Dark
              </button>
            </li>
            <li>
              <button
                data-set-theme="valentine"
                className="focus:bg-neutral focus:text-neutral-content"
              >
                Pink
              </button>
            </li>
            <li>
              <button
               data-set-theme="retro" 
               className="focus:bg-neutral focus:text-neutral-content">
                Retro
              </button>
            </li>
          </ul>
      </div>
    </main>
  );
}

export default ThemeController;
