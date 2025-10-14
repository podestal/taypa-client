// import { Menu } from "lucide-react"

import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="flex justify-between items-center px-2 py-1  bg-opacity-10 backdrop-blur-sm z-50 h-10">
      <p className="text-2xl font-bold w-36 text-center">LoGo</p>
      <ul className="flex gap-2 text-xs overflow-x-auto w-full h-full items-center">
        <li className="whitespace-nowrap text-center">
          <Link to="/burger">Las Burgers</Link>
        </li>
        <li className="whitespace-nowrap text-center">
          <Link to="/chicken">Los Pollos</Link>
        </li>
        <li className="whitespace-nowrap text-center">
          <Link to="/papas">Las Papas</Link>
        </li>
        <li className="whitespace-nowrap text-center">
          <Link to="/dessert">Los Postres</Link>
        </li>
        <li className="whitespace-nowrap text-center">
          <Link to="/bebidas">Las Bebidas</Link>
        </li>
      </ul>
    </div>
  )
}

export default Header