import useGetDishesByCategory from "../../hooks/dish/useGetDishesByCategory"
import type { Dish } from "../../services/api/dishService"
import DishCard from "./DishCard"


interface Props {
  selectedCategory: number
}

const DishMain = ({ selectedCategory }: Props) => {
  const { data: dishes, isLoading, error, isSuccess } = useGetDishesByCategory({ categoryId: selectedCategory })

  if (isLoading) return <div className="text-center text-xs font-semibold text-gray-500 animate-pulse">Un momento...</div>
  if (error) return <div className="text-center text-xs font-semibold text-red-500">Error: {error.message}</div>
  if (isSuccess)

  return (
    <div>
        {/* <>{console.log('dishes', dishes)}</> */}
        {dishes.map((dish: Dish) => (
            <DishCard key={dish.id} dish={dish} />
        ))}
    </div>
  )
}

export default DishMain