import React, { createContext, useState } from 'react';
import { FilterValueContextGeneric, FilterValueGeneric } from '@/types';

export const FilterValueContext = createContext<FilterValueContextGeneric | null>(null);

export const FilterValueProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [filterValue, setFilterValue] = useState<FilterValueGeneric>({
    field: '',
    value: ''
  });

  return (
    <FilterValueContext.Provider value={{ filterValue, setFilterValue }}>
      {children}
    </FilterValueContext.Provider>
  );
};