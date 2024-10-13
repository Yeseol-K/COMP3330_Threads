import { cookies } from "next/headers";

export async function login({ username }: { username: string; password: string }) {
  console.log("login", username);
  cookies().set("username", username);
  return { message: "ok" };
}
