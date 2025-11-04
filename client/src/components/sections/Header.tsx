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
    <header className={`w-full px-4 ${className}`}>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-4 md:px-4 lg:px-0 flex justify-between items-center h-16">
        <Link
          to="/"
          className="font-semibold text-lg tracking-tight hover:opacity-80 transition"
        >
          Events Platform
        </Link>

        <nav className="hidden sm:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition font-medium ${
                isActive(link.to)
                  ? "text-white underline underline-offset-4 decoration-2"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.label}
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
                    className={`text-lg ${
                      isActive(link.to)
                        ? "text-white underline underline-offset-4 decoration-2"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {link.label}
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
