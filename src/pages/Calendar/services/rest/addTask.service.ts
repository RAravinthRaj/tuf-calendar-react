/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import {
  buildCalendarId,
  CalendarApiResponse,
  CalendarTask,
  getDateEntries,
  readCalendarDB,
  writeCalendarDB,
} from "../../../../db";

export interface AddTaskParams {
  dateKey: string;
  title: string;
}

export const addTask = async ({
  dateKey,
  title,
}: AddTaskParams): Promise<CalendarApiResponse<CalendarTask[]>> => {
  if (!dateKey || !title.trim()) {
    throw new Error("Missing required task fields.");
  }

  const state = readCalendarDB();
  const entries = getDateEntries(dateKey);
  const tasks = [
    ...entries.tasks,
    {
      id: buildCalendarId(),
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ];

  writeCalendarDB({
    ...state,
    [dateKey]: {
      ...entries,
      tasks,
    },
  });

  return { payload: tasks };
};

