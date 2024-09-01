import { Product, ProductItem, Ingredient } from "@prisma/client";

// Берём объект продуктов и добавляем к нему два свойства
export type ProductWithRelations = Product & { items: ProductItem[]; ingredients: Ingredient[] };