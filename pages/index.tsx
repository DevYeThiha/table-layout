import Image from "next/image";
import { Inter } from "next/font/google";
import { useFetchQuery, useFetchQueryWithQuery } from "@/hooks/useQuery";
import { cn } from "@/lib/utils";
import UserTable from "@/tables/users/UserTable";
import { columns } from "@/tables/users/UserColumn";
import { User } from "@/tables/users/types";
import { IMeta } from "@/types/common";
import Paganation from "@/components/Paganation";
import { defaultMetaValue } from "@/constants";
import AdapaterProvider from "@/provider/Adapter";
import { useQueryClient } from "@tanstack/react-query";
import useQueryKey from "@/hooks/useQueryKey";
import { useEffect, useMemo, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [enabled, setEnabled] = useState(false);
  const { data, isLoading, refetch, isFetched } = useFetchQueryWithQuery<{
    data: User[];
    meta: IMeta;
  }>("/users", undefined, {
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    
    // _optimisticResults: "optimistic",
    enabled
  });
  const queryClient = useQueryClient();
  const queryKey = useQueryKey("/users");
  const queryData = queryClient.getQueryData(queryKey) as any;
  console.log({queryData})
  


  
  const user = data?.data;


  const meta = !!user?.meta ? user?.meta : (defaultMetaValue as IMeta);


  useEffect(() => {
    if(!queryData){
      setEnabled(true);
    }else{
      setEnabled(false)
    }
    
  },[queryData])
  
  return (
    <main className={cn("flex-center", inter.className)}>
      <AdapaterProvider>
        {user && <UserTable user={user.data} isFetched={isFetched} refetch={refetch} columns={columns} />}
      </AdapaterProvider>
      <Paganation {...meta} />
      {/* {
        queryData && (queryData as any).map((item:any) => (
          <>
            {JSON.stringify(item)}
          </>
        ))
      } */}
    </main>
  );
}
