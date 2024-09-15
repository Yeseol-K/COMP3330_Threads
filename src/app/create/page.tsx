import { notFound } from "next/navigation";
import * as fakeDatabase from "../fakeDatabase";
import CreatePostForm from "../components/create-post";

export default function Create() {
  const user = fakeDatabase.getUser("jane_doe");
  if (!user) {
    notFound();
  }
  return <CreatePostForm user={user} />;
}
