// import { notFound } from "next/navigation";
// import * as fakeDatabase from "../fakeDatabase";
// import CreatePostForm from "../components/create-post";
import { db } from "../../db";
import { posts, users } from "../../db/schema/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import SubmitButton from "./submit-button";
import { eq } from "drizzle-orm";

export default async function CreatePost() {
  // Fetch user data before rendering
  const userId = 1; // Example user ID
  const user = await db.select().from(users).where(eq(users.id, userId));

  async function handleCreatePost(data: FormData) {
    "use server";
    const content = data.get("content") as string;
    console.log(content);

    const result = await db
      .insert(posts)
      .values({
        content,
        userId: userId,
        date: new Date(),
        likes: 0,
        replies: 0,
      })
      .returning();
    console.log(result);

    revalidatePath("/");
    redirect("/");
  }
  // Destructure the user data from the query result
  const currentUser = user[0];
  return (
    <main className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <div className="flex items-center gap-4 mb-4">
          <img src={currentUser.avatar} alt={currentUser.username} className="w-12 h-12 rounded-full object-cover" />
          <h2 className="text-black font-semibold text-lg">{currentUser.username}</h2>
        </div>

        <form className="relative" action={handleCreatePost}>
          <textarea className="bg-transparent text-black rounded-lg p-4 w-full h-24 resize-none focus:outline-none" name="content" placeholder="Post a thing..." required />

          <div className="text-neutral-500 text-sm mt-2">Characters: 0</div>

          <div className="flex justify-end mt-4">
            <SubmitButton />
          </div>
        </form>
      </div>
    </main>
  );
}
