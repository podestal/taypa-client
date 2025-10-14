// import { Menu } from "lucide-react"

import { NavLink } from "react-router-dom"

const links = [
  {
    name: "Las Burgers",
    to: "/burger"
  },
  {
    name: "Los Pollos",
    to: "/chicken"
  },
  {
    name: "Las Papas",
    to: "/papas"
  },
  {
    name: "Los Postres",
    to: "/dessert"
  },
  {
    name: "Las Bebidas",
    to: "/bebidas"
  }
]

const Header = () => {
  return (
    <div className="flex justify-between items-center px-2 py-1  bg-opacity-10 backdrop-blur-sm z-50 h-10">
      <p className="text-2xl font-bold w-36 text-center">LoGo</p>
      <ul className="flex gap-2 text-xs overflow-x-auto w-full h-full items-center">
        {links.map((link) => (
          <li 
            className="whitespace-nowrap text-center font-semibold"
            key={link.name}
          >
            <NavLink 
              to={link.to}
              className={({ isActive }) => 
                `px-3 py-1 rounded  transition-all duration-400 ${
                  isActive 
                    ? 'bg-red-600 text-white' 
                    : 'hover:bg-red-100 hover:text-red-600'
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Header