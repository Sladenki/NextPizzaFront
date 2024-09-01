
import { prisma } from "@/prisma/prisma-client";
import { TopBar, Filters, Container, Title } from "@/shared/components/shared";
import { ProductsGroupList } from "@/shared/components/shared/products-group-list";
import { Suspense } from "react";

export default async function Home() {

  // Берём категории из БД
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          items: true,
        },
      },
    },
  });

  return (
    <Suspense>
      {/* --- Шапка --- */}
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      {/* Меню (пиццы \ завтраки \ закуски) + сортировка (популярное \ ...)  */}
      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      {/* --- Основная страница --- */}
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">

          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters/>
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
                {
                  categories.map((category) => (
                    category.products.length > 0 && (
                      <ProductsGroupList
                        key={category.id}
                        title={category.name}
                        categoryId={category.id}
                        items={category.products}
                      />
                    )
                  ))
                }
            </div>
          </div>
        </div>
      </Container>
    </Suspense>
  );
}
