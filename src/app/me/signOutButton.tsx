"use client";

import { redirect } from "next/navigation";

export default function SignOutButton({ signOut }: { signOut: () => void }) {
  return (
    <button
      className="text-neutral-500 hover:text-neutral-700"
      onClick={() => {
        signOut();
        redirect("/");
      }}
    >
      Sign Out
    </button>
  );
}
