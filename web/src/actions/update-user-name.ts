"use server";


import { userNameSchema } from "@/lib/validations/user";
import { auth } from "@clerk/nextjs";

import { revalidatePath } from "next/cache";

export type FormData = {
  name: string;
};

export async function updateUserName(userId: string, data: FormData) {
  try {
    const session = auth();

    if (!session?.user || session?.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    const { name } = userNameSchema.parse(data);

    // Update the user name.


    revalidatePath('/dashboard/settings');
    return { status: "success" };
  } catch (error) {
    console.log(error)
    return { status: "error" }
  }
}