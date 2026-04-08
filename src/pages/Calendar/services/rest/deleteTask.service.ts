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
  readCalendarDB,
  writeCalendarDB,
} from "./helpers/calendarDb";

export interface DeleteTaskParams {
  dateKey: string;
  taskId: string;
}

export const deleteTask = async ({
  dateKey,
  taskId,
}: DeleteTaskParams): Promise<CalendarApiResponse<CalendarTask[]>> => {
  if (!dateKey || !taskId) {
    throw new Error("Missing required task fields.");
  }

  const state = readCalendarDB();
  const entries = getDateEntries(dateKey);
  const tasks = entries.tasks.filter((task) => task.id !== taskId);

  writeCalendarDB({
    ...state,
    [dateKey]: {
      ...entries,
      tasks,
    },
  });

  return { payload: tasks };
};
