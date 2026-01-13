import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-20 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="text-xl font-bold text-white tracking-wide">
          Catalog<span className="text-indigo-400">App</span>
        </div>

        {/* Links */}
        <div className="flex gap-8 text-sm font-medium">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `transition ${
                isActive
                  ? "text-indigo-400"
                  : "text-gray-300 hover:text-white"
              }`
            }
          >
            Products
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
