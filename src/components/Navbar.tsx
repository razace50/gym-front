import React from "react";
import logo from "../../public/images/logo.png";
import { Button } from "./ui/button";
import { AlignJustify } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "About", link: "/about" },
    { id: 3, name: "Services", link: "/services" },
    { id: 4, name: "Contact", link: "/contact" },
  ];

  const handleNavItemClick = () => {
    // Close the menu when a nav item is clicked
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-slate-950 text-white px-6 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={logo} className="h-[75px] w-[75px]" alt="logo" />
          <a href="/" className="flex flex-col ml-2 hover:text-slate-300">
            <div className="flex flex-col space-y-0">
              <h1 className="text-3xl font-semibold">Hamro</h1>
              <span className="text-3xl font-semibold"> Gym</span>
            </div>
          </a>
        </div>

        {/* Hamburger Icon for small devices */}
        <div className="lg:hidden sm:block order-2">
          <Button
            variant={"secondary"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2"
          >
            <AlignJustify />
          </Button>
        </div>

        {/* Navigation Items for Large Devices */}
        <div className="hidden lg:flex items-center justify-between space-x-12">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="text-lg font-semibold hover:underline"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Show menu Items on Small Devices when Hamburger is Clicked */}
        <div
          className={`lg:hidden w-full bg-orange-500 ${
            isMenuOpen ? "block" : "hidden"
          } mt-4 hover:shadow-lg p-4`}
        >
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="block py-2 text-lg font-semibold hover:underline"
              onClick={handleNavItemClick} // Close menu when an item is clicked
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Join Membership Button */}
        <div className="order-1">
          <Button variant={"secondary"}>Join Membership</Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
