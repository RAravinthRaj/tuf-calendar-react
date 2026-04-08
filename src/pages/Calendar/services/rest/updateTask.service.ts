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
} from "../../../../db";

export interface UpdateTaskParams {
  dateKey: string;
  taskId: string;
  title: string;
}

export const updateTask = async ({
  dateKey,
  taskId,
  title,
}: UpdateTaskParams): Promise<CalendarApiResponse<CalendarTask[]>> => {
  if (!dateKey || !taskId || !title.trim()) {
    throw new Error("Missing required task fields.");
  }

  const state = readCalendarDB();
  const entries = getDateEntries(dateKey);
  const tasks = entries.tasks.map((task) =>
    task.id === taskId ? { ...task, title: title.trim() } : task,
  );

  writeCalendarDB({
    ...state,
    [dateKey]: {
      ...entries,
      tasks,
    },
  });

  return { payload: tasks };
};
