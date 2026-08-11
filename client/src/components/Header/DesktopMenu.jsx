import { logout } from "@slices/authSlice";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "@slices/userApiSlice";

import { ShoppingBag, Tag, User, Settings } from "lucide-react";

const DesktopMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [isOpen, setIsOpen] = useState(false);
  const [adminIsOpen, setAdminIsOpen] = useState(false);

  const menuRef = useRef(null);
  const adminMenuRef = useRef(null);

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }

      if (adminMenuRef.current && !adminMenuRef.current.contains(e.target)) {
        setAdminIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="hidden items-center sm:ml-6 sm:flex sm:space-x-8">
      <Link
        to="/categories"
        className="flex items-center gap-1 text-sm font-semibold text-slate-950 hover:text-slate-600 transition-all"
      >
        <Tag className="h-4 w-4" strokeWidth={2} />
        categories
      </Link>

      <Link
        to="/cart"
        className="flex items-center gap-1 text-sm font-semibold text-slate-950 hover:text-slate-600 transition-all"
      >
        <ShoppingBag className="h-4 w-4" strokeWidth={2} />
        cart
        {cartItems.length > 0 && (
          <span className="min-w-6 min-h-6 flex items-center justify-center rounded-full bg-indigo-500 text-center text-sm font-semibold text-white">
            {cartItems.length}
          </span>
        )}
      </Link>

      {userInfo ? (
        <div className="relative z-50" ref={menuRef}>
          <button
            className="focus:outline-offset-3 rounded-full bg-gray-200 p-2 focus:outline-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <User className="h-5 w-5" />
          </button>

          {isOpen && (
            <nav className="absolute right-0 top-10 min-w-48 rounded-lg bg-white shadow-sm">
              <div className="border-b border-gray-300 p-4 pb-3">
                <p className="text-sm leading-normal">
                  <span className="font-semibold text-gray-900">
                    {userInfo.name}
                  </span>
                  <br />
                  <span className="text-gray-900">{userInfo.email}</span>
                </p>
              </div>
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-200 focus:bg-gray-300"
              >
                Profile
              </Link>
              <Link
                to="/my-orders"
                className="block px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-200 focus:bg-gray-300"
              >
                My Orders
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 transition-all hover:bg-gray-200 focus:bg-gray-300"
              >
                Logout
              </button>
            </nav>
          )}
        </div>
      ) : (
        <Link
          to="/login"
          className="flex items-center gap-1 text-sm font-semibold text-slate-950 hover:text-slate-600 transition-all"
        >
          <User className="h-4 w-4" strokeWidth={2} />
          login
        </Link>
      )}

      {userInfo && userInfo.isAdmin && (
        <div className="relative z-50" ref={adminMenuRef}>
          <button
            onClick={() => setAdminIsOpen(!adminIsOpen)}
            className="focus:outline-offset-3 rounded-full bg-gray-200 p-2 focus:outline-2"
          >
            <Settings className="h-5 w-5" />
          </button>

          {adminIsOpen && (
            <nav className="absolute right-0 top-10 min-w-48 rounded-lg bg-white shadow-md">
              <Link
                to="/admin/orderslist"
                className="block px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-200 focus:bg-gray-300"
              >
                All Orders
              </Link>
              <Link
                to="/admin/userslist"
                className="block px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-200 focus:bg-gray-300"
              >
                All Users
              </Link>
              <Link
                to="/admin/productslist"
                className="block px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-200 focus:bg-gray-300"
              >
                All Products
              </Link>
            </nav>
          )}
        </div>
      )}
    </nav>
  );
};

export default DesktopMenu;
