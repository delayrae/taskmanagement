import { databases, ID } from "@/lib/appwrite";
import { patchProps, postProps } from "@/types";
import { Query } from "appwrite";

// =========== GET DOCUMENTS =========== //
export async function fetchData() {
  const response = await databases.listDocuments(
    `${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_TASK_COLLECTION_ID}`,
    [Query.limit(500)]
  );

  console.log(response);

  return response;
}

// =========== CREATE DOCUMENT =========== //
export async function postData({ title, desc, status, priority }: postProps) {
  const response = await databases.createDocument(
    `${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_TASK_COLLECTION_ID}`,
    ID.unique(),
    {
      title: title,
      desc: desc,
      status: status,
      priority: priority,
    }
  );

  const Task = {
    $id: response.$id,
    title: response.title,
    desc: response.desc,
    status: response.status,
    priority: response.priority,
  };

  return Task;
}

// =========== PATCH DOCUMENT =========== //
export async function patchData({ $id, status, priority }: patchProps) {
  const response = databases.updateDocument(
    `${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_TASK_COLLECTION_ID}`,
    `${$id}`,
    {
      status: status,
      priority: priority,
    }
  );

  console.log(response);
}

// =========== DELETE DOCUMENT =========== //
export async function deleteData({ $id }: { $id: string }) {
  const response = databases.deleteDocument(
    `${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_TASK_COLLECTION_ID}`,
    `${$id}`
  );

  console.log(response);
}
