import { Link } from "react-router-dom";

import { Tag, User, ShoppingBag } from "lucide-react";
import MobileSearchBar from "./MobileSearchBar";

const MobileMenu = () => {
  return (
    <nav className="relative z-10 w-full bg-white pb-2 sm:max-w-sm over-flow-y-auto">
      <MobileSearchBar />
      <div className="h-2" />
      <div>
        <Link
          to="/categories"
          className="block w-full px-4 py-2 font-medium text-slate-950 transition-all hover:bg-slate-200 hover:text-indigo-700"
        >
          <span className="flex items-center gap-1">
            <Tag />
            Categories
          </span>
        </Link>
        <Link
          to="/login"
          className="block w-full px-4 py-2 font-medium text-slate-950 transition-all hover:bg-slate-200 hover:text-indigo-700"
        >
          <span className="flex items-center gap-1">
            <User />
            Login
          </span>
        </Link>
        <Link
          to="/cart"
          className="block w-full px-4 py-2 font-medium text-slate-950 transition-all hover:bg-slate-200 hover:text-indigo-700"
        >
          <span className="flex items-center gap-1">
            <ShoppingBag />
            Cart
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileMenu;
