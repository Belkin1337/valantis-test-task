import { ProductItem } from "./components/product-card"
import { useCallback, useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import { Preloader } from "./components/ui/preloader";
import { ProductCardGeneric } from "./types";
import { useGetIds } from "./lib/hooks/use-get-ids";
import { useItems } from "./lib/hooks/use-items";
import { useFilterValue } from "./lib/hooks/use-filter-value";
import { useFilter } from "./lib/hooks/use-filter";
import { useDebounce } from "usehooks-ts";
import { Header } from "./components/header";

export const App = () => {
  const [offset, setOffset] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const { filterValue } = useFilterValue();

  const debouncedFilterValue = useDebounce(filterValue, 1200);

  const { data: filteredItems } = useFilter(debouncedFilterValue); // фильтрованный список товаров
  const { data: allIds, refetch: refetchIds } = useGetIds(offset); // массив со списком товаров
  const sortedItems = debouncedFilterValue.field && debouncedFilterValue.value ? filteredItems?.result : allIds?.result // несорт. || сорт. массив
  const { data: itemsData, 
    isPending, 
    isFetching, 
    isLoading, 
    isError, 
    error, 
    isPlaceholderData, 
    refetch: refetchItems 
  } = useItems(sortedItems); // массив со списоком товаров со всеми хар-ками

  useEffect(() => {
    if (debouncedFilterValue.field && debouncedFilterValue.value) {
      refetchItems();
    } else {
      refetchIds();
    }
  }, [debouncedFilterValue, refetchItems, refetchIds]);

  const rawItems: ProductCardGeneric[] = itemsData ? itemsData.result : [];
  const uniqueItems: ProductCardGeneric[] = Array.from(new Map(rawItems.map(item => [item.id, item])).values());

  const handlePrevPage = useCallback(() => {
    if (offset >= 50) {
      setOffset((old) => old - 50);
      setPage((old) => old - 1);
    }
  }, [offset])

  const handleNextPage = useCallback(() => {
    setOffset((old) => old + 50);
    setPage((old) => old + 1);
  }, [])

  return (
    <>
      <Header />
      <div className="flex flex-col pt-20 gap-y-6 min-h-screen p-8 w-full 
      bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200">
        <div className="flex flex-col justify-center items-center w-full min-h-screen">
          {isFetching ? <Preloader /> : isError ? (
            <div>{error.message}</div>
          ) : (
            <div className="flex flex-col gap-y-6">
              <div className="grid grid-cols-2 
              sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 grid-rows-7 gap-4">
                {uniqueItems.map((item) => (
                  <ProductItem
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
            className="disabled:bg-neutral-600"
          >
            Назад
          </Button>{' '}
          <p className="text-black font-semibold">
            Стр: {page + 1}
          </p>
          <Button
            onClick={handleNextPage}
            disabled={isFetching || isPlaceholderData}
            className="disabled:bg-neutral-600"
          >
            Далее
          </Button>
        </div>
      </div>
    </>
  )
}