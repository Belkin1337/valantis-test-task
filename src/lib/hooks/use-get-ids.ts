import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAPI } from "../api/get-ids";

export const useGetIds = (offset: number) => {
  return useQuery({
    queryKey: ["getIds", offset],
    queryFn: () =>
      fetchAPI("get_ids", {
        offset: offset,
        limit: 50,
      }),
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};