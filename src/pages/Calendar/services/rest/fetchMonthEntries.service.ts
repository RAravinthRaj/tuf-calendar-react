/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import {
  CalendarApiResponse,
  CalendarMonthEntries,
  getMonthEntries,
} from "./helpers/calendarDb";

export const fetchMonthEntries = async (
  monthKey: string,
): Promise<CalendarApiResponse<CalendarMonthEntries>> => {
  if (!monthKey) {
    throw new Error("Missing month key.");
  }

  return {
    payload: getMonthEntries(monthKey),
  };
};
