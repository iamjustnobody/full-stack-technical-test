import { navLinks } from "@/shared/constants";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";

export function Header({ className = "" }: { className?: string }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  return (
    <header
      className={`w-full px-4 ${className} shadow-xl backdrop-blur-sm bg-dark-1/95 border-b border-gray-800`}
    >
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-4 md:px-4 lg:px-0 flex justify-between items-center h-16">
        <Link
          to="/"
          className="font-semibold text-lg tracking-tight hover:opacity-90 transition duration-300"
        >
          Events Platform
        </Link>

        <nav className="hidden sm:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative font-medium transition-all duration-300 ${
                isActive(link.to)
                  ? "text-white underline underline-offset-4 decoration-2"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.label}
              {/* <span
                className={`
              absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300
              ${isActive(link.to) ? "w-full" : "group-hover:w-full"}
            `}
              /> */}
            </Link>
          ))}
        </nav>

        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button aria-label="Menu" className="text-gray-200">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-gray-900 text-white border-l border-gray-800 p-4"
            >
              <nav className="flex flex-col space-y-4 mt-8 p-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={` relative text-lg transition-all duration-300 ${
                      isActive(link.to)
                        ? "text-white underline underline-offset-4 decoration-2 font-semibold"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {/* <span
                      className={`
                    absolute left-0 bottom-0 w-0 h-0.5 bg-white transition-all duration-300
                    ${isActive(link.to) ? "w-full" : "hover:w-full"}
                  `}
                    /> */}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
