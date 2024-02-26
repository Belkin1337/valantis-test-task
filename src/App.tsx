import { ProductCard } from "./components/product-card"
import { useState } from "react";
import { FilterItem } from "./components/filter";
import { Button } from "./components/ui/button";
import { Preloader } from "./components/ui/preloader";
import { ProductCardGeneric } from "./types";
import { useGetIds } from "./lib/hooks/use-get-ids";
import { useItems } from "./lib/hooks/use-items";
import { useFilterValue } from "./lib/hooks/use-filter-value";
import { useFilter } from "./lib/hooks/use-filter";
import { useDebounce } from "usehooks-ts";

const LIMIT = 50;

export const App = () => {
  const [offset, setOffset] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const { filterValue } = useFilterValue();

  const debouncedFilterValue = useDebounce(filterValue, 1200);

  const { data: ids } = useGetIds(offset);
  const { data: filteredItems } = useFilter(debouncedFilterValue);
  const {
    data: itemsData,
    isPending,
    isFetching,
    isLoading,
    isError,
    error,
    isPlaceholderData,
  } = useItems(filteredItems ? filteredItems.result : ids?.result || []);

  const allItems: ProductCardGeneric[] = itemsData ? itemsData.result : [];

  const handlePrevPage = () => {
    if (offset >= LIMIT) {
      setOffset((old) => old - LIMIT);
      setPage((old) => old - 1);
    }
  };

  const handleNextPage = () => {
    setOffset((old) => old + LIMIT);
    setPage((old) => old + 1);
  };

  const uniqueItems: ProductCardGeneric[] = Array.from(new Map(allItems.map(item => [item.id, item])).values());
  
  return (
    <div className="flex flex-col gap-y-6 min-h-screen p-8 w-full bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200">
      <div className="flex justify-end">
        <FilterItem />
      </div>
      <div className="flex flex-col justify-center items-center w-full min-h-screen">
        {isFetching ? <Preloader /> : isError ? (
          <div>{error.message}</div>
        ) : (
          <div className="flex flex-col gap-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 grid-rows-7 gap-4">
              {uniqueItems.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  product={item.product}
                  brand={item.brand}
                  price={item.price}
                />
              ))}
            </div>
          </div>
        )}
        {(!isPending && !isLoading && uniqueItems.length === 0) && (
          <div className="flex w-full justify-center">
            <p className="text-neutral-950 text-3xl">
              Товаров нет. ;(
            </p>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 w-full justify-center">
        <Button
          onClick={handlePrevPage}
          disabled={offset === 0}
          className="disabled:bg-neutral-600 bg-green-600 text-white rounded-md p-1"
        >
          Назад
        </Button>{' '}
        <p className="text-red-500">
          Стр: {page + 1}
        </p>
        <Button
          onClick={handleNextPage}
          disabled={isFetching || isPlaceholderData}
          className="disabled:bg-neutral-600 bg-green-600 text-white rounded-md p-1"
        >
          Далее
        </Button>
      </div>
    </div>
  )
}