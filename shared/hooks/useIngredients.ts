
import { Ingredient } from "@prisma/client";
import { useState, useEffect } from "react";
import { Api } from "../services/api-client";

export const useIngredients = () => {
    // Получение ингредиентов с БД
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    // Загрузка ингредиентов
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchIngredients() {
            try {
                setLoading(true)
                const ingredients = await Api.ingredients.getAll();
                setIngredients(ingredients)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchIngredients()
    }, [])

    return {
        ingredients,
        loading
    }
}