import Header from "../../router/Header"
import DishMain from "../../components/dish/DishMain"
import { useState } from "react";

const MainPage = () => {

  const [selectedCategory, setSelectedCategory] = useState(1);
  return (
    <div className="h-screen flex flex-col w-full overflow-x-hidden">
      <>{console.log('selectedCategory', selectedCategory)}</>
        <Header 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="flex-1 overflow-y-auto">
          <DishMain selectedCategory={selectedCategory} />
        </div>
    </div>
  )
}

export default MainPage