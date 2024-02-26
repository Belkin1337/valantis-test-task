import { ProductCardGeneric } from "@/types"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"

export const ProductItem = ({
  id,
  product,
  brand,
  price
}: ProductCardGeneric) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-start justify-between flex-col w-[256px] h-[256px] rounded-md *:text-white bg-black/80 p-2">
          <div className="flex flex-col gap-y-2 items-start justify-start overflow-hidden pt-4">
            <p className="font-semibold text-lg">
              {product}
            </p>
            {brand !== null ? (
              <div className="flex justify-center w-full">
                <p className="text-neutral-400 text-lg">
                  *{brand}
                </p>
              </div>
            ) : null}
          </div>
          <div className="self-end overflow-hidden p-1">
            <p className="text-lg">
              {price} руб
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-between max-w-4xl h-[660px] flex-row gap-x-6">
        <img
          src="/images/wedding-ring.png"
          className="w-[424px] h-[424px] rounded-md"
        />
        <div className="flex flex-col h-full items-center w-full justify-between gap-y-2">
          <p className="text-md self-end">
            {id}
          </p>
          <div className="flex flex-col items-center">
            {product !== null ? (
              <p className="text-2xl text-center font-semibold">
                {product}
              </p>
            ) : null}
            {brand !== null ? (
              <p className="text-2xl">
                *Бренд: {brand}
              </p>
            ) : null}
          </div>
          <p className="self-end text-2xl font-semibold">
            Цена: {price} руб
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}