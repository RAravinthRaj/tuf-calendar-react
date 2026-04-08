/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import {
  addNote,
  AddNoteParams,
  addTask,
  AddTaskParams,
  deleteNote,
  DeleteNoteParams,
  deleteTask,
  DeleteTaskParams,
  fetchMonthEntries,
  fetchNotes,
  fetchTasks,
  toggleTask,
  ToggleTaskParams,
  updateNote,
  UpdateNoteParams,
  updateTask,
  UpdateTaskParams,
} from "./rest";

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
}

export default CalendarService.getInstance();
export * from "./rest";
