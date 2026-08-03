const Footer = () => {
  return (
    <footer className="flex-start items-center justify-center w-full bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-3 py-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-slate-700 sm:text-left">
          Copyright {new Date().getFullYear()} StyleSpot. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
