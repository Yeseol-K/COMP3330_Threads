import FeedPost from "../../components/feed-post";
import { users } from "@/db/schema/schema";
// import { db } from "@/db";
import { getPostsByUser, getUser } from "../realDatabase";
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

import GitProfile from "./profile";
import SignOutButton from "./signOutButton";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("api/auth/signin?callbackUrl=/me");
  }

  // const user = await getUser(userId);
  const posts = await getPostsByUser(session.user.id);

  return (
    <>
      <GitProfile user={session.user} />
      <SignOutButton
        signOut={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      />
      <div className="mt-7">
        <div className="w-full border-b mb-5">
          <div className="mb-2">Posts</div>
        </div>
        <div className="flex flex-col divide-y">
          {posts.map((post) => (
            <FeedPost key={post.posts.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
