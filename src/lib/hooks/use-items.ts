import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAPI } from "../api/get-ids";

export const useItems = (ids: string[]) => {
  return useQuery({
    queryKey: ["getItems", ids],
    queryFn: () =>  fetchAPI("get_items", { ids }),
    enabled: !!ids,
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
  });
};