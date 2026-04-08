/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import {
  CalendarApiResponse,
  CalendarTask,
  getDateEntries,
} from "../../../../db";

export const fetchTasks = async (
  dateKey: string,
): Promise<CalendarApiResponse<CalendarTask[]>> => {
  if (!dateKey) {
    throw new Error("Missing date key.");
  }

  return {
    payload: getDateEntries(dateKey).tasks,
  };
};

