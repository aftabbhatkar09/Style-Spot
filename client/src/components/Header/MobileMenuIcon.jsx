import { Menu, X } from "lucide-react";

const MobileMenuIcon = ({ isOpen, setIsOpen }) => {
  return (
    <button
      className="block sm:hidden cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? (
        <X className="h-6 w-6 text-slate-900" strokeWidth={2} />
      ) : (
        <Menu className="h-6 w-6 text-slate-900" strokeWidth={2} />
      )}
    </button>
  );
};

export default MobileMenuIcon;
