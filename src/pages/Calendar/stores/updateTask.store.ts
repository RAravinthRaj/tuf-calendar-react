/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { create } from "zustand";
import CalendarService, { CalendarTask, UpdateTaskParams } from "../services";

type State = {
  updateTaskLoading: boolean;
  updateTaskResponse: CalendarTask[] | null;
  updateTaskError: string | null;
  fetchUpdateTask: (params: UpdateTaskParams) => Promise<void>;
  resetUpdateTask: () => void;
};

export const useUpdateTaskStore = create<State>((set) => ({
  updateTaskLoading: false,
  updateTaskResponse: null,
  updateTaskError: null,
  fetchUpdateTask: async (params) => {
    try {
      set({ updateTaskLoading: true, updateTaskError: null });
      const res = await CalendarService.updateTaskAPI(params);
      set({ updateTaskResponse: res.payload });
    } catch (err: any) {
      set({ updateTaskError: err?.message });
    } finally {
      set({ updateTaskLoading: false });
    }
  },
  resetUpdateTask: () =>
    set({
      updateTaskLoading: false,
      updateTaskResponse: null,
      updateTaskError: null,
    }),
}));
