import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import categoryService, { type Category } from "../../services/api/categoryService";

const useGetCategoriesForMenu = (): UseQueryResult<Category[], Error> => {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryService.get(),
    });
}

export default useGetCategoriesForMenu;