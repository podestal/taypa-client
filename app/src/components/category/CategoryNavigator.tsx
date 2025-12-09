import { NavLink } from "react-router-dom"
import type { Category } from "../../services/api/categoryService"

interface Props {
    categories: Category[]
    scrollContainerRef: React.RefObject<HTMLUListElement>
}

const CategoryNavigator = ({ categories, scrollContainerRef }: Props) => {
  return (
    <ul 
          ref={scrollContainerRef}
          className="flex gap-1 text-xs overflow-x-auto w-full h-full items-center scrollbar-hide scroll-smooth"
        >
          {categories.map((category) => (
            <li 
              className="whitespace-nowrap text-center font-semibold flex-shrink-0"
              key={category.id}
            >
              <NavLink 
                to={category.name.toLowerCase()}
                className={({ isActive }) => 
                  `py-1 rounded transition-all duration-400 ${
                    isActive 
                      ? 'bg-red-600 text-white px-2' 
                      : 'hover:bg-red-100 hover:text-red-600 mr-2'
                  }`
                }
              >
                {category.name}
              </NavLink>
            </li>
          ))}
        </ul>
  )
}

export default CategoryNavigator