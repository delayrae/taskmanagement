export type FormInputProps = {
  control: Control<z.infer<typeof authFormSchema>>;
  name: string;
  label: string;
  type: string;
  placeholder: string;
};

export type UpdateFormprops = {
  status: string;
  priority: string;
  $id: string;
};

export type TableData = {
  $id: string;
  status: "Pending" | "Processing" | "Done" | "Failed";
  priority: "Low" | "Medium" | "High";
  title: string;
  desc: string;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export type postProps = {
  status: string;
  priority: string;
  title: string;
  desc: string;
};

export type patchProps = {
  $id: string;
  status: string;
  priority: string;
};
