import { Search } from "lucide-react";

const MobileSearchBar = () => {
  return (
    <div className="relative block px-4 py-2 w-full sm:hidden">
      <Search className="h-4 w-4 absolute left-7 top-5 text-slate-400" />
      <input
        type="search"
        placeholder="What are you looking for?"
        className="h-10 w-full rounded-lg bg-slate-200 px-4 pl-10 text-sm outline-slate-600 placeholder:text-slate-500"
      />
    </div>
  );
};

export default MobileSearchBar;
