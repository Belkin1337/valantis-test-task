import { useCallback, useEffect, useRef, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Search } from 'lucide-react';
import { useSearchParams } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { ChevronsUpDown } from "lucide-react"
import { useFilterValue } from "@/lib/hooks/use-filter-value";
import { params } from "@/lib/constants";

export const FilterItem = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchVisible, setSearchVisible] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchType, setSearchType] = useState<string>("brand");

  const searchRef = useRef<HTMLDivElement>(null);
  const { filterValue, setFilterValue } = useFilterValue()

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
      setSearchVisible(false);
    }
  };

  const handleChange = useCallback((param: string, value: string | number) => {
    const searchParamsObj = new URLSearchParams(searchParams);
  
    if (!value && value !== 0) {
      searchParamsObj.delete(param);
      setFilterValue({ field: searchType, value: '' });
    } else {
      searchParamsObj.set(param, String(value));
      setFilterValue({ field: searchType, value: value }); 
    }
  
    setSearchParams(searchParamsObj);
  }, [searchParams, setSearchParams, searchType, setFilterValue]);

  useEffect(() => {
    const param = searchParams.get(searchType);

    if (param !== null) {
      setFilterValue({
        field: searchType,
        value: param
      });
    }
  }, [searchParams, searchType, setFilterValue]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    handleChange(searchType, value);
  }, [searchType, handleChange]);

  return (
    <div ref={searchRef} className="flex items-center gap-x-4">
      {searchVisible || filterValue.value ? (
        <div className="flex items-center gap-x-2 bg-neutral-100 pl-2 rounded-xl">
          <Search size={20} className="text-neutral-600" />
          <Input
            placeholder={`Найти по ${searchType}`}
            value={filterValue.value}
            className="bg-transparent border-none outline-none ring-0 ring-transparent"
            type={searchType === 'price' ? 'number' : 'text'}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <div onClick={() => setSearchVisible(!searchVisible)}
          className="bg-transparent hover:bg-neutral-100 rounded-full p-2 cursor-pointer">
          <Search
            size={20}
            className="text-neutral-600"
          />
        </div>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" aria-expanded={open} className="w-[200px] justify-between">
            {searchType === 'brand' && 'Бренд'
              || searchType === 'price' && 'Цена'
              || searchType === 'product' && 'Название'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 flex flex-col">
          {params.map((param) => (
            <Button
              variant="link"
              key={param.value}
              className="p-2 hover:bg-neutral-100 cursor-pointer"
              onClick={() => setSearchType(param.value)}
            >
              {param.label}
            </Button>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  )
}