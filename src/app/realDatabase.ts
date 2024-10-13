import { db } from "@/db";
import { users as usersTable } from "@/db/schema/schema";
import { posts as postsTable } from "@/db/schema/schema";
import { media as mediaTable } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

const postQuery = db.select().from(postsTable).innerJoin(usersTable, eq(usersTable.id, postsTable.userId)).leftJoin(mediaTable, eq(mediaTable.id, postsTable.id));
export function getPosts() {
  return postQuery.execute();
}
// Dynamic getPostsByUser function
export function getPostsByUser(username: string) {
  return postQuery.where(eq(usersTable.username, username));
}
export type PostResult = Awaited<ReturnType<typeof postQuery.execute>>[0];

// Dynamic getUser function
export function getUser(username: string) {
  return db.select().from(usersTable).where(eq(usersTable.username, username));
}

export type UserResult = Awaited<ReturnType<typeof postQuery.execute>>[0];
