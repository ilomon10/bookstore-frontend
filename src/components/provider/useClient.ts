import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { dataProvider } from "./dataProvider";
import { BaseRecord, QueryFilter } from "./types";
import { useCallback } from "react";

export const useGetOne = ({
  resource,
  id,
}: {
  resource: string;
  id: string;
}) => {
  const queryFn = useQuery({
    queryKey: ["get-one", resource, id],
    queryFn: async () => {
      const result = await dataProvider().getOne({ resource, id });
    },
  });
  return queryFn;
};
export const useGetMany = <TData extends BaseRecord = BaseRecord>({
  resource,
  filter,
}: {
  resource: string;
  filter: QueryFilter;
}) => {
  // @ts-ignore
  const queryFn = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: [
      "get-many",
      resource,
      // ...Object.keys(filter).map((key) => `${key}-${filter[key]}`),
    ],
    queryFn: async ({ pageParam }) => {
      console.log("FETCH", pageParam);
      const paginate = {
        $limit: filter.$limit || 20,
        $skip: filter.$skip || 0,
      };
      const result = await dataProvider().getMany<TData>({
        resource,
        filter: { ...filter, ...paginate, $skip: paginate.$limit * pageParam },
      });
      return result.data;
    },
    getNextPageParam: (prev, allPages) => {
      return prev.length ? allPages.length + 1 : undefined;
    },
  });
  return queryFn as UseInfiniteQueryResult<
    InfiniteData<TData[], unknown>,
    Error
  >;
};

export const useCreate = <TData>({ resource }: { resource: string }) => {
  const mutate = useCallback(
    async (variables: TData) => {
      return await dataProvider().create({ resource, variables });
    },
    [resource]
  );
  return { mutate };
};
