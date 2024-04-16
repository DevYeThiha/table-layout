import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useQueryKey from "@/hooks/useQueryKey";
import { useQueryClient } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from "./types";

interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  user: TData[];
  refetch: any;
  isFetched: boolean;
}

export function UserTable<TData, TValue>({
  columns,
  user,
  refetch,
  isFetched
}: UserTableProps<TData, TValue>) {
  const [data, setData] = useState<TData[]>([]);
const queryClient = useQueryClient();

const queryKey = useQueryKey("/users");
const router = useRouter();
const updateData = () => {
  const queryData = queryClient.getQueryData(queryKey) as any;
  if(queryData){
    setData(queryData.data.data)
  }
}
  const helloFunc = (id: string, newName: string) => {
    

    queryClient.setQueryData(queryKey, (oldData:any) => {
   
      const oldUsers = oldData.data.data;
      const updateFunc = (item:any) => ({
        ...item,
        name: item.id == id ? newName: item.name
      })
      const newUsers = oldUsers.map(updateFunc);
    

      oldData.data.data = newUsers;
      console.log({oldData})
      return oldData
    });
    updateData();
  };

  const cancelFunc = () => {
    
    queryClient.removeQueries({queryKey});
    refetch();
  }
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      helloFunc,
      cancelFunc
    },
  });

 
  
  useEffect(() => {
    updateData()
  },[isFetched, router])
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserTable;
