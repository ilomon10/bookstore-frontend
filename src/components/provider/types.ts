import { User } from "./entity";

export type BaseRecord = {
  id?: string;
};

export type QueryFilter = {
  [field: string]: any;
};

export type GetListResponse<TData = BaseRecord> = {
  data: TData[];
  limit: number;
  skip: number;
  total: number;
};

export type CreateResponse<TData = BaseRecord> = {
  data: TData;
};

export interface DataProvider {
  getOne: <TData extends BaseRecord = BaseRecord>(params: {
    resource: string;
    id: string;
  }) => Promise<GetListResponse<TData>>;

  getMany: <TData extends BaseRecord = BaseRecord>(params: {
    resource: string;
    filter: QueryFilter;
  }) => Promise<GetListResponse<TData>>;

  create: <TData extends BaseRecord = BaseRecord, TVariables = {}>(params: {
    resource: string;
    variables: TVariables;
  }) => Promise<CreateResponse<TData>>;
}

export interface AuthBindings {
  login: (email: string) => Promise<{
    success: boolean;
    user?: User;
  }>;
  logout: () => void;
  check: () => {
    success: boolean;
    user?: User;
  };
}
