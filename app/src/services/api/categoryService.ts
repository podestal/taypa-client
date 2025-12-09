import APIClient from "./apiClient";

export interface Category {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    is_active: boolean;
}

const categoryService = new APIClient<Category>('categories/for_menu/');

export default categoryService;