/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import {
  CalendarAttachedNote,
  CalendarAttachedNotesStorageShape,
  CalendarNoteScope,
} from "./types";
import {
  buildCalendarId,
  getAttachedNotesStorageKey,
  readStorageItem,
  writeStorageItem,
} from "./storage";

export interface GetAttachedNotesParams {
  scope: CalendarNoteScope;
  monthKey: string;
  dateKey?: string;
  startDateKey?: string;
  endDateKey?: string;
}

export interface SaveAttachedNoteParams {
  noteId?: string;
  scope: CalendarNoteScope;
  monthKey: string;
  content: string;
  dateKey?: string;
  startDateKey?: string;
  endDateKey?: string;
}

export const readAttachedNotesDB = (): CalendarAttachedNotesStorageShape =>
  readStorageItem<CalendarAttachedNotesStorageShape>(
    getAttachedNotesStorageKey(),
    [],
  );

export const writeAttachedNotesDB = (
  notes: CalendarAttachedNotesStorageShape,
) => {
  writeStorageItem(getAttachedNotesStorageKey(), notes);
};

export const getAttachedNotes = ({
  scope,
  monthKey,
  dateKey,
  startDateKey,
  endDateKey,
}: GetAttachedNotesParams) =>
  readAttachedNotesDB()
    .filter((note) => {
      if (note.scope !== scope) {
        return false;
      }

      if (scope === "month") {
        return note.monthKey === monthKey;
      }

      if (scope === "date") {
        return note.dateKey === dateKey;
      }

      return (
        note.startDateKey === startDateKey && note.endDateKey === endDateKey
      );
    })
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));

export const getAttachedNotesForDate = ({
  monthKey,
  dateKey,
}: {
  monthKey: string;
  dateKey: string;
}) =>
  readAttachedNotesDB()
    .filter((note) => {
      if (note.scope === "month") {
        return note.monthKey === monthKey;
      }

      if (note.scope === "date") {
        return note.dateKey === dateKey;
      }

      return (
        !!note.startDateKey &&
        !!note.endDateKey &&
        dateKey >= note.startDateKey &&
        dateKey <= note.endDateKey
      );
    })
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));

export const saveAttachedNote = ({
  noteId,
  scope,
  monthKey,
  content,
  dateKey,
  startDateKey,
  endDateKey,
}: SaveAttachedNoteParams) => {
  const trimmedContent = content.trim();

  if (!trimmedContent) {
    throw new Error("Write a note before saving.");
  }

  if (scope === "date" && !dateKey) {
    throw new Error("Choose a date for this note.");
  }

  if (scope === "range" && (!startDateKey || !endDateKey)) {
    throw new Error("Select a start date and an end date first.");
  }

  const notes = readAttachedNotesDB();

  if (noteId) {
    const updatedNotes = notes.map((note) =>
      note.id === noteId
        ? {
            ...note,
            content: trimmedContent,
            scope,
            monthKey,
            dateKey,
            startDateKey,
            endDateKey,
          }
        : note,
    );

    writeAttachedNotesDB(updatedNotes);

    return getAttachedNotes({
      scope,
      monthKey,
      dateKey,
      startDateKey,
      endDateKey,
    });
  }

  const nextNote: CalendarAttachedNote = {
    id: buildCalendarId(),
    content: trimmedContent,
    createdAt: new Date().toISOString(),
    scope,
    monthKey,
    dateKey,
    startDateKey,
    endDateKey,
  };

  writeAttachedNotesDB([...notes, nextNote]);

  return getAttachedNotes({
    scope,
    monthKey,
    dateKey,
    startDateKey,
    endDateKey,
  });
};

export const deleteAttachedNote = (noteId: string) => {
  if (!noteId) {
    throw new Error("Missing note id.");
  }

  writeAttachedNotesDB(
    readAttachedNotesDB().filter((note) => note.id !== noteId),
  );
};

