/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import {
  CalendarAttachedNote,
  CalendarNoteScope,
  deleteAttachedNote,
  getAttachedNotes,
  getAttachedNotesForDate,
  saveAttachedNote,
} from "../../../../db";

export interface GetAttachedNotesParams {
  scope: CalendarNoteScope;
  monthKey: string;
  dateKey?: string;
  startDateKey?: string;
  endDateKey?: string;
}

export interface GetAttachedNotesForDateParams {
  monthKey: string;
  dateKey: string;
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

export const fetchAttachedNotes = (
  params: GetAttachedNotesParams,
): CalendarAttachedNote[] => getAttachedNotes(params);

export const fetchAttachedNotesForDate = (
  params: GetAttachedNotesForDateParams,
): CalendarAttachedNote[] => getAttachedNotesForDate(params);

export const upsertAttachedNote = (
  params: SaveAttachedNoteParams,
): CalendarAttachedNote[] => saveAttachedNote(params);

export const removeAttachedNote = (noteId: string) => {
  deleteAttachedNote(noteId);
};

