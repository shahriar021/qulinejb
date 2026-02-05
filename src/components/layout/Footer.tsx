import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
      <div className="flex-col bg-linear-to-b from-black  to-[#181a1d] w-full p-8 items-center justify-center">
        <div className="w-full  items-center justify-center flex gap-5">
          <Link href={"/"} className="underline text-blue-600">
            home
          </Link>
          <Link href={"/recently-viewed"} className="underline text-blue-600">
            my recent list
          </Link>
        </div>
        <div className="flex max-w-7xl mx-auto w-full  items-center justify-center p-5">
          <p className="text-sm text-gray-400 ">© 2026 qulinejb movie web app. All rights reserved.</p>
        </div>
      </div>
    );
}

export default Footer;
