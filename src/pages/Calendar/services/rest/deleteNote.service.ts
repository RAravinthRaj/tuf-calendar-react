/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import {
  CalendarApiResponse,
  CalendarNote,
  getDateEntries,
  readCalendarDB,
  writeCalendarDB,
} from "./helpers/calendarDb";

export interface DeleteNoteParams {
  dateKey: string;
  noteId: string;
}

export const deleteNote = async ({
  dateKey,
  noteId,
}: DeleteNoteParams): Promise<CalendarApiResponse<CalendarNote[]>> => {
  if (!dateKey || !noteId) {
    throw new Error("Missing required note fields.");
  }

  const state = readCalendarDB();
  const entries = getDateEntries(dateKey);
  const notes = entries.notes.filter((note) => note.id !== noteId);

  writeCalendarDB({
    ...state,
    [dateKey]: {
      ...entries,
      notes,
    },
  });

  return { payload: notes };
};
