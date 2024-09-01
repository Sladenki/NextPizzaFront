import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useState } from "react";

// Бегунок с ценой 
interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

// Filters получает всё что есть в PriceProps + ...
interface QueryFilters extends PriceProps {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export interface Filters {
    sizes: Set<string>;
    pizzaTypes: Set<string>;
    selectedIngredients: Set<string>;
    prices: PriceProps
}

interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setPizzaTypes: (value: string) => void;
    setSizes: (value: string) => void;
    setSelectedIngredients: (value: string) => void;
}


// Хук отвечающий за фильтрацию товаров 
export const useFilters = (): ReturnProps => {
    // Работа с query параметрами в URL
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>

    // Храним выбранные ингредиенты
    const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(
        searchParams.get('ingredients')?.split(',')
    ))

    // Чекбоксы - типы пицц
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(
        // Сохраняет данные фильтрации после перезагрузки страницы 
        searchParams.has('pizzaTypes') ? searchParams.get('pizzaTypes')?.split(',') : []
    ));

    // Чекбоксы - размеры пицц
    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(
        // Сохраняет данные фильтрации после перезагрузки страницы 
        searchParams.has('sizes') ? searchParams.get('sizes')?.split(',') : []
    ));

    // Бегунок с ценой
    const [prices, setPrices] = useState<PriceProps>({
        // Сохраняет данные фильтрации после перезагрузки страницы 
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined
    })

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices(prev => ({
            ...prev,
            [name]: value
        }))        
    }

    return {
        sizes,
        pizzaTypes,
        selectedIngredients,
        prices,
        setPrices: updatePrice,
        setPizzaTypes: togglePizzaTypes,
        setSizes: toggleSizes,
        setSelectedIngredients: toggleIngredients
    }
}