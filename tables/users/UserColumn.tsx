import { ColumnDef, RowData } from "@tanstack/react-table";
import { User } from "./types";
import { useAdapater } from "@/provider/Adapter";



export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row,getValue,table }) => {
      const { id } = row.original;
      const meta = table.options.meta as {
        helloFunc: (id:string, value: string) => void;
        cancelFunc: () => void
      };
      return (
        <div>
          <input
            value={row?.original?.name}
            onChange={(e) => {
              const value = e.target.value;

              meta.helloFunc(id,value)}
            }
          />
        </div>
      )
    },
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row,getValue,table }) => {
      const { id } = row.original;
      const meta = table.options.meta as {
        helloFunc: (id:string, value: string) => void;
        cancelFunc: () => void
      };
      return (
        <div>
         <button
         value={row?.original?.name}
         onClick={(e) => {
           

           meta.cancelFunc()}
         }
         >
          Cancel
         </button>
        </div>
      )
    },
  },
];
