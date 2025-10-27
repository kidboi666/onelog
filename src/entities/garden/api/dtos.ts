import type { ReactElement } from "react";

export interface IDateBlock {
  month: number;
  days: ReactElement[];
}

export interface IBlockInfo {
  month: number;
  date: number;
  weekDay: number;
  year: number;
}

export interface IGetGarden {
  userId: string;
  selectedYear: number;
}
