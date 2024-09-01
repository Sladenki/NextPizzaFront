export const mapPizzaSize = {
    20: 'Маленькая',
    30: 'Средняя',
    40: 'Большая',
} as const;
  
export const mapPizzaType = {
    1: 'толстое',
    2: 'тонкое',
} as const;

export type PizzaSizeItem = { value: string; name: string; disabled?: boolean };


// --- Создаём массив из объектов ---
// Array [Object { value: "20", name: "Маленькая" }, Object { value: "30", name: "Средняя" }, Object { value: "40", name: "Большая" }]
export const pizzaSizes = Object.entries(mapPizzaSize).map<PizzaSizeItem>(([value, name]) => ({
    value,
    name,
}));
  
export const pizzaTypes = Object.entries(mapPizzaType).map<PizzaSizeItem>(([value, name]) => ({
    value,
    name,
}));

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;