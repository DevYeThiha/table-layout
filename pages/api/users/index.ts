// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { userData } from "@/data";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: number;
  name: string;
  age: number;
}[];

const data = userData;

function paginate(array:any[], page_size:number, page_number:number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;
  if (method == "GET") {

    const page = req.query.page;
    if (typeof page == "string") {
      const num = +page;
      res.status(200).json({
        data: paginate(data,5,num),
        meta: {
          page: num,
          nextPage: num + 1,
          prePage: num - 1,
          totalPages: Math.ceil(data.length / 5)
        }
      });
    }
    res.status(200).json({ data: paginate(data,5,1),
      meta: {
        page: 1,
        nextPage: 1 + 1,
        prePage: 1 - 1,
        totalPages: Math.ceil(data.length / 5)
      }
    });
  }
  res.status(200).json([]);
}
