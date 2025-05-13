import { NavLink } from "react-router-dom";

export default function Navigation() {
  const navItems = [
    { name: "Client Register", path: "/client-register" },
    { name: "Wallet Recharge", path: "/wallet-recharge" },
    { name: "Pay", path: "/pay" },
    { name: "Check Balance", path: "/check-balance" },
  ];

  return (
    <nav className="flex flex-wrap gap-2 justify-center">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `px-4 py-2 rounded-md font-medium transition-colors ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}
