import { realtimeListener } from "@/actions/appwrite/realtimeListener";
import { fetchData } from "@/actions/appwrite/taskActions";
import { columns } from "@/components/Table/columns";
import { DataTable } from "@/components/Table/data-table";

export default async function Table() {
  try {
    const response = await fetchData();
    const documents = response.documents || [];

    return (
      <div className="w-[100%] mx-auto p-10">
        <DataTable columns={columns} data={documents} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Failed to load data</div>;
  }
}
