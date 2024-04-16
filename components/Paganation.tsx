import { IMeta } from "@/types/common";
import { useRouter } from "next/router";

interface PaganationProps extends IMeta {}
type setQueryParams = {
    deletePreviousQueryParams?: boolean;
  };

const Paganation: React.FC<PaganationProps> = ({ totalPages }) => {
    const router = useRouter();
    const setQueryParams = (
        values: any,
        options: setQueryParams = {
          deletePreviousQueryParams: false,
        }
      ) => {
        router.replace(
          {
            //@ts-ignore
            query: {
              ...(options.deletePreviousQueryParams ? {} : router.query),
              ...values,
            },
          },
          undefined,
          {
            shallow: true,
          }
        );
      };
  return (
    <div className="w-full flex justify-end gap-[5px] px-5 mt-5">
      {[...Array(totalPages)].map((item: any, index) => (
        <button
          type="button"
          className="w-[2rem] aspect-square flex-center bg-black text-white rounded-sm"
          key={index}
          onClick={() => {
            setQueryParams({page:index+1})
          }}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Paganation;
