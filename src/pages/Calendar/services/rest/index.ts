/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { addNote, AddNoteParams } from "./addNote.service";
import { addTask, AddTaskParams } from "./addTask.service";
import {
  fetchAttachedNotes,
  fetchAttachedNotesForDate,
  GetAttachedNotesForDateParams,
  GetAttachedNotesParams,
  removeAttachedNote,
  SaveAttachedNoteParams,
  upsertAttachedNote,
} from "./attachedNotes.service";
import { deleteNote, DeleteNoteParams } from "./deleteNote.service";
import { deleteTask, DeleteTaskParams } from "./deleteTask.service";
import { fetchMonthEntries } from "./fetchMonthEntries.service";
import { fetchNotes } from "./fetchNotes.service";
import { fetchTasks } from "./fetchTasks.service";
import {
  fetchHoliday,
  fetchMonthHolidays,
  removeHoliday,
  SaveHolidayParams,
  upsertHoliday,
} from "./holidays.service";
import { toggleTask, ToggleTaskParams } from "./toggleTask.service";
import { updateNote, UpdateNoteParams } from "./updateNote.service";
import { updateTask, UpdateTaskParams } from "./updateTask.service";

class CalendarService {
  private static instance: CalendarService;

  private constructor() {}

  static getInstance(): CalendarService {
    if (!CalendarService.instance) {
      CalendarService.instance = new CalendarService();
    }

    return CalendarService.instance;
  }

  async fetchNotesAPI(dateKey: string) {
    return fetchNotes(dateKey);
  }

  async addNoteAPI(params: AddNoteParams) {
    return addNote(params);
  }

  async fetchTasksAPI(dateKey: string) {
    return fetchTasks(dateKey);
  }

  async addTaskAPI(params: AddTaskParams) {
    return addTask(params);
  }

  async updateNoteAPI(params: UpdateNoteParams) {
    return updateNote(params);
  }

  async deleteNoteAPI(params: DeleteNoteParams) {
    return deleteNote(params);
  }

  async toggleTaskAPI(params: ToggleTaskParams) {
    return toggleTask(params);
  }

  async updateTaskAPI(params: UpdateTaskParams) {
    return updateTask(params);
  }

  async deleteTaskAPI(params: DeleteTaskParams) {
    return deleteTask(params);
  }

  async fetchMonthEntriesAPI(monthKey: string) {
    return fetchMonthEntries(monthKey);
  }

  getAttachedNotesAPI(params: GetAttachedNotesParams) {
    return fetchAttachedNotes(params);
  }

  getAttachedNotesForDateAPI(params: GetAttachedNotesForDateParams) {
    return fetchAttachedNotesForDate(params);
  }

  saveAttachedNoteAPI(params: SaveAttachedNoteParams) {
    return upsertAttachedNote(params);
  }

  deleteAttachedNoteAPI(noteId: string) {
    removeAttachedNote(noteId);
  }

  getHolidayAPI(dateKey: string) {
    return fetchHoliday(dateKey);
  }

  getMonthHolidaysAPI(monthKey: string) {
    return fetchMonthHolidays(monthKey);
  }

  saveHolidayAPI(params: SaveHolidayParams) {
    return upsertHoliday(params);
  }

  deleteHolidayAPI(dateKey: string) {
    removeHoliday(dateKey);
  }
}

export default CalendarService.getInstance();
export * from "./addNote.service";
export * from "./addTask.service";
export * from "./attachedNotes.service";
export * from "./deleteNote.service";
export * from "./deleteTask.service";
export * from "./fetchMonthEntries.service";
export * from "./fetchNotes.service";
export * from "./fetchTasks.service";
export * from "./holidays.service";
export * from "./toggleTask.service";
export * from "./updateNote.service";
export * from "./updateTask.service";
export type {
  CalendarApiResponse,
  CalendarAttachedNote,
  CalendarHoliday,
  CalendarMonthEntries,
  CalendarNote,
  CalendarNoteScope,
  CalendarTask,
} from "../../../../db";
