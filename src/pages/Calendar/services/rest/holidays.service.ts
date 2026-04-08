/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import {
  CalendarHoliday,
  deleteHoliday,
  getHoliday,
  getMonthHolidays,
  saveHoliday,
} from "../../../../db";

export interface SaveHolidayParams {
  dateKey: string;
  label: string;
}

export const fetchHoliday = (dateKey: string): CalendarHoliday | null =>
  getHoliday(dateKey);

export const fetchMonthHolidays = (
  monthKey: string,
): Record<string, CalendarHoliday> => getMonthHolidays(monthKey);

export const upsertHoliday = (params: SaveHolidayParams): CalendarHoliday =>
  saveHoliday(params);

export const removeHoliday = (dateKey: string) => {
  deleteHoliday(dateKey);
};

