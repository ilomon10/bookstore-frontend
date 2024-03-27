import { axiosInstance } from "./axios";
import { BaseRecord, CreateResponse, DataProvider } from "./types";

export const dataProvider = (): DataProvider => ({
  create: async ({ resource, variables }) => {
    return (await axiosInstance.post(`/${resource}`, variables)).data;
  },
  getOne: async ({ resource, id }) => {
    return (await axiosInstance.get(`/${resource}/${id}`)).data;
  },
  getMany: async ({ resource, filter }) => {
    return (
      await axiosInstance.get(`/${resource}`, {
        params: filter,
      })
    ).data;
  },
});
