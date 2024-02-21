import { db } from "@/db/db";
import { quotaTable, usersTable } from "@/db/schema";
import { clerkClient } from "@clerk/nextjs";

export async function setInitialUserData(userId: string) {
  if (userId.startsWith("user_")) {
    const user = await clerkClient.users.getUser(userId);

    // incase we dont have username such as google login, fallback to first name + last name
    const usernameFallback =
      user.username ?? (user.firstName ?? "") + (user.lastName ?? "");

    // For the display name, if it for some reason is empty, fallback to username
    let nameFallback = (user.firstName ?? "") + (user.lastName ?? "");
    if (nameFallback === "") {
      nameFallback = usernameFallback;
    }

    const result = await db.insert(usersTable).values({
      id: userId,
      // this is used for path, make sure this is unique
      username: usernameFallback,

      // this is for display name, maybe different from username
      name: nameFallback,
    });
    return result;
  } else if (userId.startsWith("org_")) {
    const user = await clerkClient.organizations.getOrganization({ organizationId: userId });

    // incase we dont have username such as google login, fallback to first name + last name
    const usernameFallback = user.name;

    // For the display name, if it for some reason is empty, fallback to username
    let nameFallback = user.name

    const result = await db.insert(usersTable).values({
      id: userId,
      // this is used for path, make sure this is unique
      username: usernameFallback,

      // this is for display name, maybe different from username
      name: nameFallback,
    });
    const oneMonthLater = new Date();

    // Add one month to the new date object
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);
    // create quota
    await db.insert(quotaTable)
      .values({
        id: userId,
        plan: "free",
        credit: 1000,
        rate: 100,
        gpt4: false,
        dalle: false,
        gemini: true,
        beta: false,
        stripe_current_period_end: oneMonthLater
      })
      .onConflictDoNothing();
    return result;
  }
}
