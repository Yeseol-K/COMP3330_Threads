// import { Post } from "../../fakeDatabase";
export default function Post({ params }: { params: { id: string } }) {
  return (
    <main className="text-center mt-10">
      <div>
        <h1>Post {params.id}</h1>
        <p>TODO: display post</p>
      </div>
    </main>
  );
}
