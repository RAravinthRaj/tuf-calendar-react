/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import {
  CalendarApiResponse,
  CalendarNote,
  buildCalendarId,
  getDateEntries,
  readCalendarDB,
  writeCalendarDB,
} from "./helpers/calendarDb";

export interface AddNoteParams {
  dateKey: string;
  content: string;
}

export const addNote = async ({
  dateKey,
  content,
}: AddNoteParams): Promise<CalendarApiResponse<CalendarNote[]>> => {
  if (!dateKey || !content.trim()) {
    throw new Error("Missing required note fields.");
  }

  const state = readCalendarDB();
  const entries = getDateEntries(dateKey);
  const notes = [
    ...entries.notes,
    {
      id: buildCalendarId(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    },
  ];

  writeCalendarDB({
    ...state,
    [dateKey]: {
      ...entries,
      notes,
    },
  });

  return {
    payload: notes,
  };
};
