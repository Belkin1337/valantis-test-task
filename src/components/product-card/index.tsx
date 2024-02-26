import { ProductCardGeneric } from "@/types"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"

export const ProductCard = ({ 
  id, 
  product, 
  brand, 
  price 
}: ProductCardGeneric) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-start justify-between flex-col w-[186px] h-[184px] *:text-white bg-black/80 p-1">
          <div className="flex items-start justify-start overflow-hidden pt-4">
            <p className="font-semibold text-md">
              {product}
            </p>
          </div>
          {brand !== null ? (
            <div className="flex justify-center w-full">
              <p className="text-neutral-400">
                {brand}
              </p>
            </div>
          ) : null}
          <div className="self-end overflow-hidden p-1">
            <p className="text-lg">
              {price}
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col">
          <p>
            Id: {id}
          </p>
          {product !== null ? (
            <p>
              Товар: {product}
            </p>
          ) : null}
          {brand !== null ? (
            <p>
              Бренд: {brand}
            </p>
          ) : null}
          <p>
            Цена: {price}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}