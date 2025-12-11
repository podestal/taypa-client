import { useState, useEffect } from "react"
import useGetDishesByCategory from "../../hooks/dish/useGetDishesByCategory"
import DishCard from "./DishCard"


interface Props {
  selectedCategory: number
}

const DishMain = ({ selectedCategory }: Props) => {
  const { data: dishes, isLoading, error, isSuccess } = useGetDishesByCategory({ categoryId: selectedCategory })
  const [currentIndex, setCurrentIndex] = useState(0)

  // Reset to first dish when category changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [selectedCategory])

  if (isLoading) return <div className="text-center text-xs font-semibold text-gray-500 animate-pulse">Un momento...</div>
  if (error) return <div className="text-center text-xs font-semibold text-red-500">Error: {error.message}</div>
  if (!isSuccess || !dishes || dishes.length === 0) return <div className="text-center text-xs font-semibold text-gray-500">No hay platos disponibles</div>

  const currentDish = dishes[currentIndex]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? dishes.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === dishes.length - 1 ? 0 : prev + 1))
  }

  return (
    <div>
      <DishCard 
        dish={currentDish} 
        dishes={dishes}
        currentIndex={currentIndex}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  )
}

export default DishMain