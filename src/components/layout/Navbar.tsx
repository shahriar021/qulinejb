"use client";

import Link from "next/link";
import { LightBulbIcon, MagnifyingGlassIcon, SunIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { navLinks } from "../lib/constants";

export default function Navbar() {
  const [isLight, setIsLight] = useState(false);
  const [isOpen, setIsOpen] = useState(false); 

  const toggleTheme = () => {
    const mode = document.documentElement.classList.toggle("light");
    setIsLight(mode);
  };

  return (
    <nav className="bg-background text-foreground p-4 sticky top-0 z-50 shadow-sm">
      <div className=" mx-auto flex items-center justify-between">

        <div className="flex items-center gap-4">
          <Link href="/">
            <p className="text-2xl md:text-3xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              qulinejb
            </p>
          </Link>
          <Link href="/search">
            <MagnifyingGlassIcon className="h-6 w-6 text-blue-500 hover:scale-110 transition-transform" />
          </Link>
        </div>

        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="font-medium hover:text-blue-500 transition-colors">
              {link.name}
            </Link>
          ))}
          <button onClick={toggleTheme} className="ml-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            {isLight ? <LightBulbIcon className="h-6 w-6 text-blue-500" /> : <SunIcon className="h-6 w-6 text-yellow-500" />}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button onClick={toggleTheme} className="p-2">
            {isLight ? <LightBulbIcon className="h-6 w-6 text-blue-500" /> : <SunIcon className="h-6 w-6 text-yellow-500" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
          </button>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden pt-4 pb-2 border-t mt-2 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-medium text-lg px-2 hover:text-blue-500"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}