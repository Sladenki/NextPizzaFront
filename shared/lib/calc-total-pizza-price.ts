import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";


/**
 * Функция для подсчета общей стоимости пиццы
 * @param type - тип теста
 * @param size - размер
 * @param items - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredientsIds - выбранные ингредиенты
 * 
 * @returns number Общую стоимость
 */

export const calcTotalPizzaPrice = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredientsIds: Set<number>
) => {
  // Узнаём цену пиццы - Сравниваем то что мы выбрали (size, type) с тем что есть в объекте items и берём цену 
  // Допустим: size, type = 30, 2 => ищем объект, совпадающий с size = 30 и type = 2 и берём цену
  const pizzaPrice = items.find((item) => item.pizzaType == type && item.size == size)?.price || 0

  // Считаем стоимость ингредиентов
  const totalIngredientsPrice = ingredients.filter((ingredient) => selectedIngredientsIds.has(ingredient.id)).reduce((acc, ingredient) => acc + ingredient.price, 0);
    
  const totalPrice = pizzaPrice + totalIngredientsPrice

  return totalPrice
}