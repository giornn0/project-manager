import { Dayjs } from "dayjs";

export interface Payment {
  id: string;
  project_id: string;
  amount: number;
  date: Date | Dayjs;
}
