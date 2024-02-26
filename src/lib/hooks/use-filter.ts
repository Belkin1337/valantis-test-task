import { FilterValueGeneric } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "../api/get-ids";

export const useFilter = ({ 
  field, 
  value 
}: FilterValueGeneric) => {
  const filteredValue = field === 'price' ? Number(value) : value;

  const { data } = useQuery({
    queryKey: ["filter", field, value],
    queryFn: () => fetchAPI("filter", { 
      [field]: filteredValue
    }),
    enabled: !!field && value !== null,
    refetchOnWindowFocus: false,
  });

  return { data };
};