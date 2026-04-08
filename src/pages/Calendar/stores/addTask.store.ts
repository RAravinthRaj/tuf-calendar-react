/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { create } from "zustand";
import CalendarService, { AddTaskParams, CalendarTask } from "../services";

type State = {
  addTaskLoading: boolean;
  addTaskResponse: CalendarTask[] | null;
  addTaskError: string | null;
  fetchAddTask: (params: AddTaskParams) => Promise<void>;
  resetAddTask: () => void;
};

export const useAddTaskStore = create<State>((set) => ({
  addTaskLoading: false,
  addTaskResponse: null,
  addTaskError: null,

  fetchAddTask: async (params: AddTaskParams) => {
    try {
      set({ addTaskLoading: true, addTaskError: null });
      const res = await CalendarService.addTaskAPI(params);
      set({ addTaskResponse: res.payload });
    } catch (err: any) {
      set({ addTaskError: err?.message });
    } finally {
      set({ addTaskLoading: false });
    }
  },

  resetAddTask: () => {
    set({
      addTaskLoading: false,
      addTaskResponse: null,
      addTaskError: null,
    });
  },
}));
