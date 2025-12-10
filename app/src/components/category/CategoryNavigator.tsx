import { NavLink } from "react-router-dom"
import type { Category } from "../../services/api/categoryService"

interface Props {
    categories: Category[]
    scrollContainerRef: React.RefObject<HTMLUListElement>
    selectedCategory: number
    setSelectedCategory: (category: number) => void
}

const categoryMenuNames = {
  "burger": "Las Burgers",
  "pollo": "Los Pollos",
  "salchipapa": "Las Papas",
  "dessert": "Los Postres",
  "bebidas": "Las Bebidas",
  "ensaladas": "Las Ensaladas",
  "combos": "Los Combos",
  "promos": "Las Promos"
}

const CategoryNavigator = ({ categories, scrollContainerRef, selectedCategory, setSelectedCategory }: Props) => {
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
              <h2 
                onClick={() => setSelectedCategory(category.id)}
                className={`py-1 rounded transition-all duration-400 ${selectedCategory === category.id ? 'bg-red-600 text-white px-2' : 'hover:bg-red-100 hover:text-red-600 mr-2'}`}
              >
                {categoryMenuNames[category.name.toLowerCase() as keyof typeof categoryMenuNames]}
              </h2>
            </li>
          ))}
        </ul>
  )
}

export default CategoryNavigator