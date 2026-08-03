import { Outlet } from "react-router-dom";

import Header from "@components/Header";
import Footer from "@components/Footer";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100">
      <Header />

      <div className="h-14 sm:h-16 lg:h-16"></div>

      <div className="grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
