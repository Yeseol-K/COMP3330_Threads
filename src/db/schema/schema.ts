// Users table
// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   username: varchar("username", { length: 30 }).notNull().unique(),
//   firstName: varchar("first_name", { length: 50 }).notNull(),
//   lastName: varchar("last_name", { length: 50 }).notNull(),
//   avatar: text("avatar").notNull(),
//   followers: integer("followers").notNull().default(0),
//   createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
// });
import { boolean, timestamp, pgTable, text, primaryKey, integer, serial, varchar } from "drizzle-orm/pg-core";

import { drizzle } from "drizzle-orm/postgres-js";
import type { AdapterAccountType } from "next-auth/adapters";

// const connectionString = "postgres://postgres:postgres@localhost:5432/drizzle";
// const pool = postgres(connectionString, { max: 1 });

// export const db = drizzle(pool);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

export const authenticators = pgTable(
  "authenticator",
  {
    credentialID: text("credentialID").notNull().unique(),
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("providerAccountId").notNull(),
    credentialPublicKey: text("credentialPublicKey").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credentialDeviceType").notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: text("transports"),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
);

// Posts table
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  date: timestamp("date", { withTimezone: true }).notNull().defaultNow(),
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
