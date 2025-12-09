import useGetCategoriesForMenu from "../../hooks/category/useGetCategoriesForMenu"

const CategoryMain = () => {

    const { data: categories, isLoading, error } = useGetCategoriesForMenu()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div>
            <>{console.log('categories', categories)}</>

        </div>
    )
}

export default CategoryMain
