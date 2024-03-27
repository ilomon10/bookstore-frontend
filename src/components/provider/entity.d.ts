import { BaseRecord } from "./types";

export interface Book extends BaseRecord {
  title: string;
  author: string;

  cover_url: string;

  price: number;
}

export interface User extends BaseRecord {
  username: string;
  email: string;

  point: number;
}
