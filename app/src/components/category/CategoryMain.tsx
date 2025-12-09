import useGetCategoriesForMenu from "../../hooks/category/useGetCategoriesForMenu"
import CategoryNavigator from "./CategoryNavigator"

interface Props {
    scrollContainerRef: React.RefObject<HTMLUListElement>
}

const CategoryMain = ({ scrollContainerRef }: Props) => {

    const { data: categories, isLoading, error, isSuccess } = useGetCategoriesForMenu()

    if (isLoading) return <div className="text-center text-xs font-semibold text-gray-500 animate-pulse">Un momento...</div>
    if (error) return <div className="text-center text-xs font-semibold text-red-500">Error: {error.message}</div>
    if (isSuccess) return <CategoryNavigator categories={categories} scrollContainerRef={scrollContainerRef} />

    return null
}

export default CategoryMain
