// utils/requireAuth.ts
import { auth } from "@/auth";
import { User } from "next-auth";

export async function requireAuth(): Promise<User> {
  const session = await auth();
  
  if (!session || !session.user) {
    throw new Error("Unauthorized"); 
  }

  return session.user as User;
}
