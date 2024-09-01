'use client';

import React, { useEffect, useRef } from 'react';
import { Title } from './title';
import { ProductCard } from './product-card';
import { cn } from '@/shared/lib/utils';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/shared/store/category';


interface Props {
  title: string;
  items: any[];
  categoryId: number;
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}) => {

  // Берём данные из Zustand
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);

  // --- Следим за скроллом ---
  const intersectionRef = useRef(null);

  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      // Сохраняем номер категории в Zustand
      setActiveCategoryId(categoryId)
    }
  }, [intersection?.isIntersecting]);

  return (
    // id={title} - это нужно для перехода по пунктам от url адреса
    <div className={className} id={title} ref={intersectionRef}>

      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items
          .filter((product) => product.items.length > 0)
          .map((product, i) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.items[0].price} // Берём [0], т.к мы указываем цену от и нам нужно первое значение
            />
          ))}
      </div>

    </div>
  );
};
