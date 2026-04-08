/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { CALENDAR_CONFIG } from "../../../config";

export interface CalendarNote {
  id: string;
  content: string;
  createdAt: string;
}

export type CalendarNoteScope = "month" | "date" | "range";

export interface CalendarAttachedNote {
  id: string;
  content: string;
  createdAt: string;
  scope: CalendarNoteScope;
  monthKey: string;
  dateKey?: string;
  startDateKey?: string;
  endDateKey?: string;
}

export interface CalendarHoliday {
  dateKey: string;
  label: string;
  createdAt: string;
}

export interface CalendarTask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface CalendarDateEntries {
  notes: CalendarNote[];
  tasks: CalendarTask[];
}

export type CalendarMonthEntries = Record<string, CalendarDateEntries>;

export interface CalendarApiResponse<T> {
  payload: T;
}

type CalendarStorageShape = Record<string, CalendarDateEntries>;
type CalendarAttachedNotesStorageShape = CalendarAttachedNote[];
type CalendarHolidayStorageShape = Record<string, CalendarHoliday>;

const createEmptyEntries = (): CalendarDateEntries => ({
  notes: [],
  tasks: [],
});

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
};

export const readCalendarDB = (): CalendarStorageShape => {
  const raw = getStorage()?.getItem(CALENDAR_CONFIG.storageKey);

  if (!raw) {
    return {};
  }

  try {
    return (JSON.parse(raw) as CalendarStorageShape) ?? {};
  } catch {
    return {};
  }
};

export const writeCalendarDB = (state: CalendarStorageShape) => {
  getStorage()?.setItem(CALENDAR_CONFIG.storageKey, JSON.stringify(state));
};

export const getDateEntries = (dateKey: string) => {
  const state = readCalendarDB();

  return state[dateKey] ?? createEmptyEntries();
};

export const getMonthEntries = (monthKey: string): CalendarMonthEntries => {
  const state = readCalendarDB();
  const monthEntries: CalendarMonthEntries = {};

  Object.entries(state).forEach(([dateKey, entries]) => {
    if (dateKey.startsWith(monthKey)) {
      monthEntries[dateKey] = entries;
    }
  });

  return monthEntries;
};

export const buildCalendarId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const getAttachedNotesStorageKey = () =>
  `${CALENDAR_CONFIG.storageKey}-attached-notes`;

const getHolidayStorageKey = () => `${CALENDAR_CONFIG.storageKey}-holidays`;

export const readAttachedNotesDB = (): CalendarAttachedNotesStorageShape => {
  const raw = getStorage()?.getItem(getAttachedNotesStorageKey());

  if (!raw) {
    return [];
  }

  try {
    return (JSON.parse(raw) as CalendarAttachedNotesStorageShape) ?? [];
  } catch {
    return [];
  }
};

export const writeAttachedNotesDB = (
  notes: CalendarAttachedNotesStorageShape,
) => {
  getStorage()?.setItem(getAttachedNotesStorageKey(), JSON.stringify(notes));
};

export interface GetAttachedNotesParams {
  scope: CalendarNoteScope;
  monthKey: string;
  dateKey?: string;
  startDateKey?: string;
  endDateKey?: string;
}

export const getAttachedNotes = ({
  scope,
  monthKey,
  dateKey,
  startDateKey,
  endDateKey,
}: GetAttachedNotesParams) => {
  return readAttachedNotesDB()
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
};

export const getAttachedNotesForDate = ({
  monthKey,
  dateKey,
}: {
  monthKey: string;
  dateKey: string;
}) => {
  return readAttachedNotesDB()
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
};

export interface SaveAttachedNoteParams {
  noteId?: string;
  scope: CalendarNoteScope;
  monthKey: string;
  content: string;
  dateKey?: string;
  startDateKey?: string;
  endDateKey?: string;
}

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
    return getAttachedNotes({ scope, monthKey, dateKey, startDateKey, endDateKey });
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

  return getAttachedNotes({ scope, monthKey, dateKey, startDateKey, endDateKey });
};

export const deleteAttachedNote = (noteId: string) => {
  if (!noteId) {
    throw new Error("Missing note id.");
  }

  writeAttachedNotesDB(
    readAttachedNotesDB().filter((note) => note.id !== noteId),
  );
};

export const readHolidayDB = (): CalendarHolidayStorageShape => {
  const raw = getStorage()?.getItem(getHolidayStorageKey());

  if (!raw) {
    return {};
  }

  try {
    return (JSON.parse(raw) as CalendarHolidayStorageShape) ?? {};
  } catch {
    return {};
  }
};

export const writeHolidayDB = (holidays: CalendarHolidayStorageShape) => {
  getStorage()?.setItem(getHolidayStorageKey(), JSON.stringify(holidays));
};

export const getHoliday = (dateKey: string) => readHolidayDB()[dateKey] ?? null;

export const getMonthHolidays = (monthKey: string) => {
  const holidays = readHolidayDB();

  return Object.fromEntries(
    Object.entries(holidays).filter(([dateKey]) => dateKey.startsWith(monthKey)),
  );
};

export interface SaveHolidayParams {
  dateKey: string;
  label: string;
}

export const saveHoliday = ({ dateKey, label }: SaveHolidayParams) => {
  const trimmedLabel = label.trim();

  if (!dateKey) {
    throw new Error("Choose a date before saving a holiday.");
  }

  if (!trimmedLabel) {
    throw new Error("Give the holiday a name.");
  }

  const holidays = readHolidayDB();
  const nextHoliday: CalendarHoliday = {
    dateKey,
    label: trimmedLabel,
    createdAt: new Date().toISOString(),
  };

  writeHolidayDB({
    ...holidays,
    [dateKey]: nextHoliday,
  });

  return nextHoliday;
};

export const deleteHoliday = (dateKey: string) => {
  if (!dateKey) {
    throw new Error("Missing holiday date.");
  }

  const holidays = readHolidayDB();

  if (!holidays[dateKey]) {
    return;
  }

  delete holidays[dateKey];
  writeHolidayDB(holidays);
};
