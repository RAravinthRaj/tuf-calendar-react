/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
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

export type CalendarStorageShape = Record<string, CalendarDateEntries>;
export type CalendarAttachedNotesStorageShape = CalendarAttachedNote[];
export type CalendarHolidayStorageShape = Record<string, CalendarHoliday>;

