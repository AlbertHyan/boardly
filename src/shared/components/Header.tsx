import { Link, NavLink } from "react-router";
import { navLinks } from "@shared/constants/navigation";

export default function Header() {
  return (
    <header className="py-2 w-full bg-white/75 backdrop-blur-3xl select-none border-b border-gray-100 mb-8">
      <div className="app-container w-full flex items-center justify-between gap-x-5">
        <Link to="/" className="font-press-start text-lg hover:text-blue-600 transition-[color]">
          Boardly
        </Link>

        <ul className="flex items-center gap-5 font-medium">
          {navLinks.map(({ id, name, to }) => (
            <li key={id}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  [
                    "transition-colors",
                    isActive
                      ? "text-blue-600"
                      : "hover:text-blue-600",
                  ].join(" ")
                }
              >
                {name}
              </NavLink>
            </li>
          ))}

          <li>
            <button type="button"
              className="flex-center gap-x-2.5 px-3 py-1 bg-black/5 border-2 border-gray-100 rounded-lg cursor-pointer hover:bg-black/10 hover:text-blue-600 transition-[color]">
              <span>Import</span>
              <i className="fa-solid fa-file-import"></i>
            </button>
          </li>
          <li>
            <button type="button"
              className="flex-center gap-x-2.5 px-3 py-1 bg-black/5 border-2 border-gray-100 rounded-lg cursor-pointer hover:bg-black/10 hover:text-blue-600 transition-[color]">
              <span>Export</span>
              <i className="fa-solid fa-file-export"></i>
            </button>
          </li>
        </ul>

        <div className="flex gap-x-2.5">
          <button type="button"
            className="flex-center gap-x-2.5 px-3 py-1 bg-black/5 border-2 border-gray-100 rounded-lg cursor-pointer hover:bg-black/10 hover:text-blue-600 transition-[color]"
          >
            <span className="font-medium">Settings</span>
            <i className="fa-solid fa-gear"></i>
          </button>
          <button type="button"
            className="flex-center gap-x-2.5 text-2xl size-10 bg-black/5 border-2 border-gray-100 rounded-lg cursor-pointer hover:bg-black/10 hover:text-blue-600 transition-[color]"
          >
            <i className="fa-solid fa-moon"></i>
          </button>
          <a href="https://github.com/AlbertHyan/boardly"
            className="flex-center gap-x-2.5 text-2xl size-10 bg-black/5 border-2 border-gray-100 rounded-lg cursor-pointer hover:bg-black/10 hover:text-blue-600 transition-[color]">
            <i className="fa-brands fa-github"></i>
          </a>
        </div>

      </div>
    </header>
  )
}
