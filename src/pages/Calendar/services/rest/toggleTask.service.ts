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

export interface ToggleTaskParams {
  dateKey: string;
  taskId: string;
}

export const toggleTask = async ({
  dateKey,
  taskId,
}: ToggleTaskParams): Promise<CalendarApiResponse<CalendarTask[]>> => {
  if (!dateKey || !taskId) {
    throw new Error("Missing required task fields.");
  }

  const state = readCalendarDB();
  const entries = getDateEntries(dateKey);
  const tasks = entries.tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task,
  );

  writeCalendarDB({
    ...state,
    [dateKey]: {
      ...entries,
      tasks,
    },
  });

  return {
    payload: tasks,
  };
};
