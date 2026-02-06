import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex items-center justify-between">
      <div className="flex items-center  gap-5">
        <Link href={"/"}>
          <p className="text-3xl font-bold bg-linear-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">qulinejb</p>
        </Link>
        <Link href={"/search"}>
          <MagnifyingGlassIcon className="h-6 w-6 text-blue-500" />
        </Link>
      </div>

      <div>
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/genres">Genres</Link>
          <Link href="/recently-viewed">Recently Viewed</Link>
          <Link href="/watch-later">Watch Later</Link>
        </div>
      </div>
    </nav>
  );
}
