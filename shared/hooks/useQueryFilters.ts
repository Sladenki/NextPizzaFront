import qs from "qs"
import { useEffect } from "react"
import { Filters } from "./useFilters"
import { useRouter } from "next/navigation"

// Функция принимает все фильтры и вшивает их в URL адресс
export const useQueryFilters = (filters: Filters) => {

    const router = useRouter()

    // Следим за всеми изменениями в фильтре
    useEffect(() => {
        // Создаём query параметр по нашим фильтрам
        const query = qs.stringify(
        {
            ...filters.prices,
            pizzaTypes: Array.from(filters.pizzaTypes),
            sizes: Array.from(filters.sizes),
            ingredients: Array.from(filters.selectedIngredients)
        },
        {
            arrayFormat: 'comma'
        })

        // Вшиваем фильтры в URL
        router.push(`?${query}`, {
            // Чтобы не было дёрганий при изменении URL (фильтров)
            scroll: false
        })
    }, [filters, router])
}