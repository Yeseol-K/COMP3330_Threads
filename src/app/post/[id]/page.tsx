import FeedPost from "../../../components/feed-post";
import { getPosts } from "@/app/realDatabase";
import NotFound from "./not-found";

export default async function Post({ params }: { params: { id: string } }) {
  const allPosts = await getPosts();
  const matchedPost = allPosts.find((p) => p.posts.id === parseInt(params.id));
  if (!matchedPost) {
    return <NotFound />;
  }
  return (
    <div className="flex flex-col divide-y" style={{ height: 3000 }}>
      <FeedPost key={matchedPost.posts.id} post={matchedPost} />
    </div>
  );
}
