import { db } from "@/db";
import { posts } from "@/db/schema/schema";
import { users as usersTable } from "@/db/schema/schema";
import { posts as postsTable } from "@/db/schema/schema";
import { media as mediaTable } from "@/db/schema/schema";
import { eq } from "drizzle-orm";

const postQuery = db.select().from(posts).innerJoin(usersTable, eq(usersTable.id, postsTable.userId)).leftJoin(mediaTable, eq(mediaTable.id, postsTable.id));
export function getPosts() {
  return postQuery;
}
//test user : jane_doe
export function getPostsByUser() {
  return postQuery.where(eq(usersTable.username, "jane_doe"));
}
export type PostResult = Awaited<ReturnType<typeof postQuery.execute>>[0];

const userQuery = db.select().from(usersTable).where(eq(usersTable.username, "jane_doe"));

export function getUser() {
  return userQuery;
}

export type UserResult = Awaited<ReturnType<typeof postQuery.execute>>[0];
