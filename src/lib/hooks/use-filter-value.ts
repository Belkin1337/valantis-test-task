import { FilterValueContext } from "@/providers/filter-provider";
import { useContext } from "react";

export const useFilterValue = () => {
  const context = useContext(FilterValueContext);

  if (!context) {
    throw new Error('useFilterValue must be used within a FilterValueProvider');
  }

  return context;
};