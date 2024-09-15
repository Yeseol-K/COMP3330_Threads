import Image from "next/image";
import * as fakeDatabase from "./fakeDatabase";
import FeedPost from "./components/feed-post";
// import { db } from "@/db";

export default function Home() {
  const fakePosts = fakeDatabase.getPosts();
  return (
    <div className="flex flex-col divide-y" style={{ height: 3000 }}>
      {fakePosts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  );
}
