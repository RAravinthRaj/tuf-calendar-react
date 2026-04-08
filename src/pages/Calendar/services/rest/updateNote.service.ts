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

export interface UpdateNoteParams {
  dateKey: string;
  noteId: string;
  content: string;
}

export const updateNote = async ({
  dateKey,
  noteId,
  content,
}: UpdateNoteParams): Promise<CalendarApiResponse<CalendarNote[]>> => {
  if (!dateKey || !noteId || !content.trim()) {
    throw new Error("Missing required note fields.");
  }

  const state = readCalendarDB();
  const entries = getDateEntries(dateKey);
  const notes = entries.notes.map((note) =>
    note.id === noteId ? { ...note, content: content.trim() } : note,
  );

  writeCalendarDB({
    ...state,
    [dateKey]: {
      ...entries,
      notes,
    },
  });

  return { payload: notes };
};
