import APIClient from "./apiClient";

export interface Dish {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string | null;
    created_at: string;
    updated_at: string;
    is_active: boolean;
    category: number;
}

const dishService = new APIClient<Dish>('dishes/by_category/');

export default dishService;