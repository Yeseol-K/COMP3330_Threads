import { pgTable, serial, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 30 }).notNull().unique(),
  firstName: varchar("first_name", { length: 50 }).notNull(),
  lastName: varchar("last_name", { length: 50 }).notNull(),
  avatar: text("avatar").notNull(),
  followers: integer("followers").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Posts table
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  date: timestamp("date", { withTimezone: true }).notNull(),
  content: text("content").notNull(),
  likes: integer("likes").notNull().default(0),
  replies: integer("replies").notNull().default(0),
});

// Media table
export const media = pgTable("media", {
  id: serial("id").primaryKey(),
  type: varchar("type", { length: 10 }).notNull(), // 'image' or 'video'
  url: text("url").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id),
});
