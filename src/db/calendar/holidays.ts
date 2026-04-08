/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { CalendarHoliday, CalendarHolidayStorageShape } from "./types";
import {
  getHolidayStorageKey,
  readStorageItem,
  writeStorageItem,
} from "./storage";

export interface SaveHolidayParams {
  dateKey: string;
  label: string;
}

export const readHolidayDB = (): CalendarHolidayStorageShape =>
  readStorageItem<CalendarHolidayStorageShape>(getHolidayStorageKey(), {});

export const writeHolidayDB = (holidays: CalendarHolidayStorageShape) => {
  writeStorageItem(getHolidayStorageKey(), holidays);
};

export const getHoliday = (dateKey: string) => readHolidayDB()[dateKey] ?? null;

export const getMonthHolidays = (monthKey: string) => {
  const holidays = readHolidayDB();

  return Object.fromEntries(
    Object.entries(holidays).filter(([dateKey]) => dateKey.startsWith(monthKey)),
  );
};

export const saveHoliday = ({ dateKey, label }: SaveHolidayParams) => {
  const trimmedLabel = label.trim();

  if (!dateKey) {
    throw new Error("Choose a date before saving a holiday.");
  }

  if (!trimmedLabel) {
    throw new Error("Give the holiday a name.");
  }

  const holidays = readHolidayDB();
  const nextHoliday: CalendarHoliday = {
    dateKey,
    label: trimmedLabel,
    createdAt: new Date().toISOString(),
  };

  writeHolidayDB({
    ...holidays,
    [dateKey]: nextHoliday,
  });

  return nextHoliday;
};

export const deleteHoliday = (dateKey: string) => {
  if (!dateKey) {
    throw new Error("Missing holiday date.");
  }

  const holidays = readHolidayDB();

  if (!holidays[dateKey]) {
    return;
  }

  delete holidays[dateKey];
  writeHolidayDB(holidays);
};

