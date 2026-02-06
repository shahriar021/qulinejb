"use client";

import Link from "next/link";
import { LightBulbIcon, MagnifyingGlassIcon, SunIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Navbar() {
  const [isLight,setIsLight]=useState(false)
      let mode;
  const toggleTheme = () => {
     mode = document.documentElement.classList.toggle("light");
     setIsLight(mode)
  };

  console.log(isLight);
  return (
    <nav className="bg-background text-foreground p-4 flex items-center justify-between">
      <div className="flex items-center  gap-5">
        <Link href={"/"}>
          <p className="text-3xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">qulinejb</p>
        </Link>
        <Link href={"/search"}>
          <MagnifyingGlassIcon className="h-6 w-6 text-blue-500" />
        </Link>
      </div>

      <div>
        <div className="flex gap-4 items-center">
          <button onClick={toggleTheme} className="px-3 py-1 ">
            {isLight ? <LightBulbIcon className="h-6 w-6 text-blue-500" /> : <SunIcon className="h-6 w-6 text-yellow-500" />}
          </button>
          <Link href="/" className="font-medium">
            Home
          </Link>
          <Link href="/genres" className="font-medium">
            Genres
          </Link>
          <Link href="/recently-viewed" className="font-medium">
            Recently Viewed
          </Link>
          <Link href="/watch-later" className="font-medium">
            Watch Later
          </Link>
        </div>
      </div>
    </nav>
  );
}
