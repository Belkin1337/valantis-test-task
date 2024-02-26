import { useCallback, useEffect, useRef, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Search } from 'lucide-react';
import { useSearchParams } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { ChevronsUpDown } from "lucide-react"
import { useFilterValue } from "@/lib/hooks/use-filter-value";

const params = [
  { label: "Бренд", value: "brand", },
  { label: "Цена", value: "price", },
  { label: "Название", value: "product", },
]

export const FilterItem = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchVisible, setSearchVisible] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchType, setSearchType] = useState<string>("brand");
  const [inputValue, setInputValue] = useState('');
  
  const searchRef = useRef<HTMLDivElement>(null);
  const { setFilterValue } = useFilterValue()

  const handleChange = useCallback((param: string, value: string | number) => {
    const searchParamsObj = new URLSearchParams(searchParams);
  
    if (!value && value !== 0) { 
      searchParamsObj.delete(param);
    } else {
      searchParamsObj.set(param, String(value));
    }
  
    setSearchParams(searchParamsObj);
  }, [searchParams, setSearchParams]);

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

    setInputValue(value); 
    handleChange(searchType, value);
  }, [searchType, handleChange]);

  return (
    <div ref={searchRef} className="flex items-center gap-x-4">
      {searchVisible ? (
        <div className="flex items-center gap-x-2 bg-neutral-100/60 pl-2 rounded-xl">
          <Search size={20} className="text-neutral-600" />
          <Input
            placeholder={`Найти по ${searchType}`}
            className="bg-transparent border-none outline-none ring-0 ring-transparent"
            value={inputValue}
            type={searchType === 'price' ? 'number' : 'text'}
            onChange={handleInputChange}
          />
        </div>
      ) : (
        <div onClick={() => setSearchVisible(!searchVisible)}
          className="bg-transparent hover:bg-neutral-100/60 rounded-full p-2 cursor-pointer">
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
            <div key={param.value} className="p-2 hover:bg-neutral-100" onClick={() => setSearchType(param.value)}>
              {param.label}
            </div>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  )
}