'use client';


import { cn } from "@/shared/lib/utils";
import { Product } from "@prisma/client";
import { Title } from "../title";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { Dialog } from "../../ui";
import { DialogContent } from "../../ui/dialog";



interface Props {
  product: ProductWithRelations;
  classname?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, classname }) => {
  const router = useRouter();

  // Если есть pizzaType, значит это пицца 
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  const onCloseModal = () => {
    router.back();
  };

  return (
    // open - только в том случае если есть продукт 
    <Dialog open={Boolean(product)} onOpenChange={onCloseModal}>
      <DialogContent 
      className={cn(
        "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
        classname
      )}>
        {isPizzaForm ? (
          // Пицца
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            items={product.items}
            // onClickAdd={onCloseModal}
            ingredients={product.ingredients}
          />
        ) : (
          // Любой другой продукт 
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            items={product.items}
            onClickAdd={onCloseModal}        
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
