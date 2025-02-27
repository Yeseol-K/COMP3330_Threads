import Image from "next/image";
import Link from "next/link";

export default async function GitProfile({
  user,
}: {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}) {
  return (
    <div className="flex justify-between">
      <div>
        <h2 className="text-3xl font-semibold">{user.name}</h2>
        <div>{user.email}</div>
      </div>
      <Link href={user.image || "#"}>
        <div className="rounded-full h-20 w-20 overflow-hidden relative">
          <Image className="object-cover" src={user.image || "/default-profile.png"} alt={user.name || "user profile image"} quality={100} priority={true} fill={true} />
        </div>
      </Link>
    </div>
  );
}
