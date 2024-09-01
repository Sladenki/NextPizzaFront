import React, { useEffect } from 'react'
import { PizzaImage } from './pizza-image';
import { cn } from '@/shared/lib/utils';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './groupVariants';
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/shared/constants/pizza';
import { Ingredient, ProductItem } from '@prisma/client';
import { IngredientItem } from './ingredient-item';
import { useSet } from 'react-use';
import { calcTotalPizzaPrice } from '@/shared/lib';

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAddCart,
  className,
  }) => {

  // Размер пиццы - то что мы выбрали - по дефолту 20см
  const [size, setSize] = React.useState<PizzaSize>(20);

  // Тип - толстое или тонкое - то что мы выбрали - по дефолту толстое
  const [type, setType] = React.useState<PizzaType>(1);

  // Выбранные ингредиенты для пиццы 
  const [selectedIngredientsIds, { toggle: toggleAddIngredient }] = useSet<number>(new Set([]));

  // Общая стоимость пиццы
  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredientsIds
  )

  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`


  // Доступные варианты пиццы по типу теста 
  const availablePizzasByType = items.filter((item) => item.pizzaType == type)

  // Доступные варианты пиццы по размеру
  const availablePizzaSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !availablePizzasByType.some((pizza) => Number(pizza.size) == Number(item.value))
  }))

  // Чтобы размер пиццы после изменения типа не менялся 
  useEffect(() => {
    const isAvailableSize = availablePizzaSizes?.find(
      (item) => Number(item.value) == size && !item.disabled,
    )

    const availableSize = availablePizzaSizes?.find((item) => !item.disabled);

    // Меняет размер пиццы если нет доступного размера по новому типу 
    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize);
    }

  }, [type])

  const handleClick = () => {
    onClickAddCart?.();
    console.log({
      size,
      type,
      ingredients: selectedIngredientsIds,
    })
  }



  return (
    <div className={cn(className, 'flex flex-1')}>
      {/* Фото пиццы */}
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#FCFCFC] p-7">
          <Title text={name} size="md" className="font-extrabold mb-1" />

          <p className="text-gray-400">{textDetails}</p>

          <div className='flex flex-col gap-4 my-5'>
            {/* Варианты размера пицц */}
            <GroupVariants 
              items={availablePizzaSizes} 
              value={String(size)}
              // Меняем размер пиццы (size) кликом и передаём его в PizzaImage для изменения размера изображения 
              onClick={value => setSize(Number(value) as PizzaSize)}
            />

            {/* Традиционное \ тонкое */}
            <GroupVariants 
              items={pizzaTypes} 
              value={String(type)}
              // Меняем тип пиццы (type) кликом и передаём его в PizzaImage для изменения типа
              onClick={value => setType(Number(value) as PizzaType)}
            />
          </div>

          <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
            <div className='grid grid-cols-3 gap-3'>
              {ingredients.map((item) => (
                <IngredientItem
                  key={item.id}
                  name={item.name}
                  imageUrl={item.imageUrl}
                  price={item.price}
                  onClick={() => toggleAddIngredient(item.id)}
                  // Нажали или нте
                  active={selectedIngredientsIds.has(item.id)}
                />
              ))}
            </div>
          </div>

          <Button
            onClick={handleClick}
            className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
            Добавить в корзину за {totalPrice} ₽
          </Button>
      </div>
    </div>
  )
}
