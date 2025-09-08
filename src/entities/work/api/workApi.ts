import axios from "axios";
import { ProductCategory } from "../model/types";
import { BASE_URL } from "../../../shared/config/api";

export const workApi = {
    getProductCategories: async (): Promise<
        ProductCategory[]
    > => {
        try {
            const response = await axios.get(
                `${BASE_URL}/products/categories`
            );

            const categories: ProductCategory[] =
                response.data.map(
                    (category: string, index: number) => ({
                        id: index.toString(),
                        category: category,
                    })
                );

            return categories;
        } catch (error) {
            console.error(
                "Не удалось загрузить список категорий:",
                error
            );
            throw new Error(
                "Не удалось загрузить список категорий"
            );
        }
    },
};
