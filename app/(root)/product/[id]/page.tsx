
import { prisma } from '@/prisma/prisma-client';
import { Container, PizzaImage, Title } from '@/shared/components/shared';
import { GroupVariants } from '@/shared/components/shared/groupVariants';

import { notFound } from 'next/navigation';


export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
            },
          },
        },
      },
      items: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          product: {
            include: {
              items: true,
            },
          },
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className='flex flex-1'>
        <PizzaImage imageUrl={product.imageUrl} size={30} />

        <div className="w-[490px] bg-[#FCFCFC] p-7">
          <Title text={product.name} size="md" className="font-extrabold mb-1" />

          <p className="text-gray-400">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati ipsa repellat doloremque cupiditate. Illum amet hic laborum debitis quos ea incidunt iusto nisi. Asperiores, libero molestiae voluptas architecto repudiandae molestias?</p>

          <GroupVariants
          // @ts-ignore
            selectedValue="2"
            items={[
              {
                name: 'Маленькая',
                value: '1',
              },
              {
                name: 'Средняя',
                value: '2',
              },
              {
                name: 'Большая',
                value: '3',
                disabled: true,
              },
            ]}
          />

        </div>

      </div>
      
    </Container>
  );
}
