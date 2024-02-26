export type ProductCardGeneric = {
  id: number,
  product: string,
  brand: string | null,
  price: number,
}

export type FilterValueGeneric = {
  field: string,
  value: string | number
}

export type FilterValueContextGeneric = {
  filterValue: FilterValueGeneric,
  setFilterValue: React.Dispatch<React.SetStateAction<FilterValueGeneric>>
}