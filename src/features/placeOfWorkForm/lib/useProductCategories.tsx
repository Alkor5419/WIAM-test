import { useState, useEffect } from "react";
import { ProductCategory } from "../../../entities/work/model/types";
import { workApi } from "../../../entities/work/api/workApi";

export const useProductCategories = () => {
    const [categories, setCategories] = useState<
        ProductCategory[]
    >([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const data =
                    await workApi.getProductCategories();
                setCategories(data);
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Произошла ошибка"
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, isLoading, error };
};
