import { Account, Client, Databases, Query } from "appwrite";
import { parseStringify } from "./utils";

export const client = new Client()
  .setEndpoint(`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}`)
  .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT}`);

export const databases = new Databases(client);
export const account = new Account(client);

export async function getLoggedInUser() {
  try {
    return await account.get();
  } catch (error) {
    return null;
  }
}

export { ID } from "appwrite";
