import { notFound } from "next/navigation";
import * as fakeDatabase from "../fakeDatabase";
import CreatePostForm from "../components/create-post";
import { db } from "../../db";
import { posts, users } from "../../db/schema/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import SubmitButton from "./submit-button";
import { eq } from "drizzle-orm";

// export default function Create() {
//   const user = fakeDatabase.getUser("jane_doe");
//   if (!user) {
//     notFound();
//   }
//   return <CreatePostForm user={user} />;
// }
export default function CreatePost() {
  async function handleCreatePost(data: FormData) {
    "use server";
    const content = data.get("content") as string;
    console.log(content);
    // const username = "jane_doe";
    // const user = await db.select().from(users).where(eq(users.username, username)).all();
    // if (!user) {
    //   console.error("User not found");
    //   return;
    // }

    const result = await db
      .insert(posts)
      .values({
        content,
        userId: 2, // Use the user's numeric ID
        date: new Date(), // Set the current date and time
        likes: 0, // Default value
        replies: 0, // Default value
      })
      .returning();
    console.log(result);
    revalidatePath("/");
    redirect("/");
  }
  return (
    <main className="text-center mt-10">
      <form className="border border-neutral-500 rounded-lg px-6 py-4 flex flex-col gap-4" action={handleCreatePost}>
        <label className="w-full">
          <textarea className="bg-transparent flex-1 border-none outline-none w-full" name="content" placeholder="Post a thing..." required />
        </label>
        {/* <button type="submit" className="border rounded-xl px-4 py-2">
          Post
        </button> */}
        <SubmitButton />
      </form>
    </main>
  );
}
