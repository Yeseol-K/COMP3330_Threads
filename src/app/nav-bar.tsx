import Link from "next/link";

import { twMerge } from "tailwind-merge";

import { HomeIcon, SearchIcon, CreateIcon, ActivityIcon, ProfileIcon } from "./icon/icons";

export default function NavBar({ className }: { className?: string }) {
  return (
    <nav className={twMerge("flex h-full justify-between items-center", className)}>
      <Link href="/" className="hover:bg-neutral-100 dark:hover:bg-neutral-900 flex justify-center items-center h-14 w-20 rounded-md transition-all fill-none stroke-neutral-600">
        <HomeIcon />
      </Link>

      <Link href="/search" className="hover:bg-neutral-100 dark:hover:bg-neutral-900 flex justify-center items-center h-14 w-20 rounded-md transition-all fill-none stroke-neutral-600 text-neutral-600">
        <SearchIcon />
      </Link>
      <Link href="/create" className="hover:bg-neutral-100 dark:hover:bg-neutral-900 flex justify-center items-center h-14 w-20 rounded-md transition-all fill-none stroke-neutral-600">
        <CreateIcon />
      </Link>
      <Link href="/activity" className="hover:bg-neutral-100 dark:hover:bg-neutral-900 flex justify-center items-center h-14 w-20 rounded-md transition-all fill-none stroke-neutral-600">
        <ActivityIcon />
      </Link>
      <Link href="/jane_doe" className="hover:bg-neutral-100 dark:hover:bg-neutral-900 flex justify-center items-center h-14 w-20 rounded-md transition-all fill-none stroke-neutral-600">
        <ProfileIcon />
      </Link>
    </nav>
  );
}
