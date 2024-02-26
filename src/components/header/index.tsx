import { FilterItem } from "../filter"

export const Header = () => {
  return (
    <div className="flex justify-between bg-gradient-to-r items-center px-8 fixed top-0 
    shadow-sm z-[50] shadow-black from-pink-400/80 to-pink-600/80 backdrop-filter backdrop-blur-md w-full h-[64px]">
      <p className="text-3xl text-white font-bold">
        Valantis (Test Task)
      </p>
      <div className="flex justify-end">
        <FilterItem />
      </div>
    </div>
  )
}