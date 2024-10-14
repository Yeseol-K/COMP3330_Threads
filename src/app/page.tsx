import Image from "next/image";
// import * as fakeDatabase from "./fakeDatabase";
import FeedPost from "../components/feed-post";
import { db } from "../db";
import { posts } from "../db/schema/schema";
import { getPosts } from "./realDatabase";
import { type PostResult as Post } from "@/app/realDatabase";

export default async function Home() {
  // const fakePosts = fakeDatabase.getPosts();
  const allPosts = await getPosts();
  return (
    <div className="flex flex-col divide-y" style={{ height: 3000 }}>
      {allPosts.map((p) => (
        <FeedPost key={p.posts.id} post={p} />
      ))}
    </div>
  );
}
