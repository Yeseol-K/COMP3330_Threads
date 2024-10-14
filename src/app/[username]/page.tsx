import { notFound } from "next/navigation";
// import * as fakeDatabase from "../fakeDatabase";
import Image from "next/image";
import Link from "next/link";
import FeedPost from "../../components/feed-post";
import { db } from "@/db";
import { getUser, getPostsByUser } from "../realDatabase";
import { type PostResult as Post } from "@/app/realDatabase";
import { type UserResult as User } from "@/app/realDatabase";

export default async function Profile({ params }: { params: { username: string } }) {
  // const user = fakeDatabase.getUser(params.username);
  const user = await getUser(params.username).execute();
  if (!user) {
    notFound();
  }
  // const posts = fakeDatabase.getPostsForUser(user.username);
  const posts = await getPostsByUser(params.username).execute();

  return (
    <>
      {/* user profile */}
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-semibold">{user[0].name}</h2>
          <div>{user[0].name}</div>
        </div>
        <Link href={user[0].image || "/default-profile.png"}>
          <div className="rounded-full h-20 w-20 overflow-hidden relative">
            <Image className="object-cover" src={user[0].image || "/default-profile.png"} alt={user[0].name || "user profile image"} quality={100} priority={true} fill={true} />
          </div>
        </Link>
      </div>
      {/* user's posts */}
      {/* <div className="mt-10">
        <div className="text-neutral-600 dark:text-neutral-400">{user[0].followers} followers</div>
      </div> */}

      <div className="mt-7">
        <div className="w-full border-b mb-5">
          <div className="mb-2">Posts</div>
        </div>
        <div className="flex flex-col divide-y">
          {posts.map((post: Post) => (
            <FeedPost key={post.posts.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}
