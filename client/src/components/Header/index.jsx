import { useState } from "react";

import DesktopMenu from "./DesktopMenu";
import Logo from "./Logo";
import MobileMenuIcon from "./MobileMenuIcon";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full border-b bg-white border-slate-200 z-10">
      <div className="relative z-50 max-w-7xl bg-white mx-auto px-3 sm:px-6 lg:px-8">
        <div className="relative flex h-14 items-center justify-between sm:h-16">
          <div className="flex flex-1 items-center justify-between gap-10">
            <Logo />
            <SearchBar />
            <DesktopMenu />
            <MobileMenuIcon isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>

      <div>{isOpen && <MobileMenu setIsOpen={setIsOpen} />}</div>
    </header>
  );
};

export default Header;
