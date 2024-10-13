import Image from "next/image";
import Link from "next/link";
// import { Post } from "../fakeDatabase";
import PostActions from "../components/post";
import time from "../components/time";
import { type PostResult as Post } from "@/app/realDatabase";

export default function FeedPost({ post }: { post: Post }) {
  function postMedia() {
    if (!post.media) {
      return null;
    }
    if (post.media.type === "image") {
      return <Image src={post.media.url} alt={post.posts.content} width={post.media.width} height={post.media.height} className="rounded-xl" />;
    }
    if (!post || !post.users.username) {
      return <div>Error: Post data is missing</div>;
    }
  }

  return (
    <article className="flex flex-col gap-4 py-4 relative ">
      <div className="flex gap-4 items-start">
        <Link href={`/${post.users.username}`}>
          <div className="rounded-full h-10 w-10 overflow-hidden relative ">
            <Image className="object-cover" src={post.users.avatar} alt={post.users.username} priority={true} fill={true} />
          </div>
        </Link>
        <div className="flex flex-col gap-2 w-[400px]">
          <div className="flex justify-between">
            <Link href={`/${post.users.username}`}>
              <div>{post.users.username}</div>
            </Link>
            <p className="dark:text-neutral-400 text-neutral-600">{time(new Date(post.posts.date))}</p>
          </div>
          <Link href={`/post/${post.posts.id}`}>
            <p className="font-light">{post.posts.content}</p>
          </Link>
          {postMedia()}
          <PostActions />
        </div>
      </div>
      <div className="flex gap-2 dark:text-neutral-400 text-neutral-600">
        <p>{post.posts.likes} likes</p>
        <p>·</p>
        <p>{post.posts.replies} replies</p>
        {/* <p>{post.retweets} retweets</p> */}
      </div>
    </article>
  );
}
