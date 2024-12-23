"use client";

import { client } from "@/lib/appwrite";
import { useEffect } from "react";
import { fetchData } from "./taskActions";

// TODO: UPDATE setDocuments TYPE
export function realtimeListener(setDocuments: any) {
  useEffect(() => {
    const channel = `databases.${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}
                      .collections
                      .${process.env.NEXT_PUBLIC_APPWRITE_TASK_COLLECTION_ID}
                      .documents`;

    const subscription = client.subscribe(channel, (response) => {
      const eventType = response.events[0];
      const changedTask = response.payload;

      if (eventType.includes("create")) {
        fetchData().then((response) => {
          setDocuments(response.documents || []); // Update the state with the latest documents
        });
      }
    });
    return () => {
      subscription(); // Unsubscribe when component unmounts
    };
  }, [setDocuments]); // Adding setDocuments as a dependency so it updates the state
}
