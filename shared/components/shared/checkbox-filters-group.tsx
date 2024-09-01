'use client'

import React, { useState } from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Input, Skeleton } from '../ui';

type Item = FilterChecboxProps;

interface Props {
    title: string;
    items: Item[];
    defaultItems?: Item[]; // Чекбоксы при первом рендере
    limit?: number; // Сколько показываем по умолчанию
    loading?: boolean;
    searchInputPlaceholder?: string;
    onClickCheckbox?: (id: string) => void;
    selected?: Set<string>;
    className?: string;
    name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
    title,
    items,
    defaultItems,
    // Задаём лимит для количества показываемых чекбоксов, т.к у нас только в ингредиентах много пунктов, то отображение "показать всё" будет только у ингрединтов 
    limit = 5,
    loading,
    searchInputPlaceholder = 'Поиск...',
    className,
    onClickCheckbox,
    selected,
    name
}) => {

    // Для показа всех категорий после "показать всё"
    const [showAll, setShowAll] = useState(false);

    // --- Для поиска ---
    const [searchValue, setSearchValue] = React.useState('');

    const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    // Создание skeleton при загрузке данных (списка ингредиентов)
    if (loading) {
        return (
            <div className={className}>
                <p className="font-bold mb-3">{title}</p>

                {...Array(limit)
                .fill(0)
                .map((_, index) => (
                    <Skeleton key={index} className='h-4 mb-5 rounded-[8px]' />
                ))}

                <Skeleton className='w-28 h-4 mb-4 rounded-[8px]' />

                
            </div>
        )
    }

    // Какой вариант списка показываем для ингредиентов - полный или после поиска 
    const list = showAll 
    ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
    : (defaultItems || items).slice(0, limit)

    return (
        <div className={className}>
            {/* Заголовок для списка чекбоксов */}
            <p className="font-bold mb-3">{title}</p>

            {/* Поле ввода для ингредиентов при полном списке */}
            {showAll && (
                <div className="mb-5">
                    <Input
                        onChange={onChangeSearchInput}
                        placeholder={searchInputPlaceholder}
                        className="bg-gray-50 border-none"
                    />
                </div>
            )}

            {/* Ренден самих чекбоксов */}
            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={selected?.has(item.value)} // Нажали или нет
                        onCheckedChange={() => onClickCheckbox?.(item.value)} // Проверка нажатия на Checkbox
                        name={name}
                    />
                ))}
            </div>

            {/* Кнопка "Показать все" для ингредиентов */}
            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                    <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                        {showAll ? 'Скрыть' : '+ Показать все'}
                    </button>
                </div>
            )}

        </div>
    )

}