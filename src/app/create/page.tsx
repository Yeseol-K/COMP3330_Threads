import { db } from "../../db";
import { posts } from "../../db/schema/schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import SubmitButton from "./submit-button";
import CreatePostForm from "../../components/create-post";
import { auth } from "@/auth";

export default async function CreatePost() {
  // Fetch user data before rendering
  const session = await auth();

  // If no session is found, redirect to login
  if (!session?.user) {
    redirect("api/auth/signin?callbackUrl=/me");
    return null; // Prevent rendering of the form
  }

  const userId = session.user.id;

  // Handle post creation
  async function handleCreatePost(data: FormData) {
    "use server"; // Mark this function as a server action
    const content = data.get("content") as string;

    // Insert the post into the database
    const result = await db
      .insert(posts)
      .values({
        content,
        userId,
        date: new Date(),
        likes: 0,
        replies: 0,
      })
      .returning();

    console.log(result); // Log the result for debugging

    // Revalidate the cache and redirect to the home page
    revalidatePath("/");
    redirect("/");
  }

  return (
    <form className="relative" action={handleCreatePost}>
      <div className="bg-white p-6 rounded-lg w-[500px]">
        <div className="flex items-center gap-4 mb-4">
          <img className="w-12 h-12 rounded-full object-cover" src={session.user.image || ""} alt={session.user.name || ""} />
          <h2 className="text-black font-semibold text-lg">{session.user.name}</h2>
        </div>
        <CreatePostForm user={session.user} />
        <div className="flex justify-end mt-4">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}
