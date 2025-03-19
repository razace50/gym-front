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

  return (
    <>
      <nav className="bg-orange-500 text-white px-6 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={logo} className="h-[75px] w-[75px]" alt="logo" />
          <div className="flex flex-col space-y-0">
            <h1 className="text-3xl font-semibold">Hamro</h1>{" "}
            <span className=" text-3xl font-semibold"> Gym</span>
          </div>
        </div>
        {/* Hamburger Icon for small devices */}
        <div className="lg:hidden md:hidden sm:block sm:order-2 ">
          <Button
            variant={"secondary"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AlignJustify />
          </Button>
        </div>
        <div className=" hidden lg:flex items-center justify-between space-x-12">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className=" text-lg font-semibold hover:underline"
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="sm:order-1">
          <Button variant={"secondary"}>Join Membership</Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
