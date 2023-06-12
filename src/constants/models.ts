export type Nullable<T> = T | null;

export interface Owner {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
}
export interface Project {
  id: string;
  name: string;
  url: string;
  owner_id: string;
}
export interface Payment {
  id: string;
  project_id: string;
  amount: number;
  date: Date;
}
