import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import dishService, { type Dish } from "../../services/api/dishService";

interface Props {
    categoryId: number
}

const useGetDishesByCategory = ({ categoryId }: Props): UseQueryResult<Dish[], Error> => {
    return useQuery({
        queryKey: ['dishes', categoryId],
        queryFn: () => dishService.get(undefined, { 'category_id': categoryId.toString() }),
    });
}

export default useGetDishesByCategory;