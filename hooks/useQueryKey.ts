import { useRouter } from "next/router";

interface useQueryKeyProps {
    
}
 
const useQueryKey = (url:string) => {
    const router = useRouter();
    const page = router.query.page;
    const queryKey: any[] = [url, {"page":page}];
    return queryKey
}
 
export default useQueryKey;