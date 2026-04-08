/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { create } from "zustand";
import CalendarService from "../services";
import { DeleteTaskParams } from "../services/rest";
import { CalendarTask } from "../../../db";

type State = {
  deleteTaskLoading: boolean;
  deleteTaskResponse: CalendarTask[] | null;
  deleteTaskError: string | null;
  fetchDeleteTask: (params: DeleteTaskParams) => Promise<void>;
  resetDeleteTask: () => void;
};

export const useDeleteTaskStore = create<State>((set) => ({
  deleteTaskLoading: false,
  deleteTaskResponse: null,
  deleteTaskError: null,
  fetchDeleteTask: async (params) => {
    try {
      set({ deleteTaskLoading: true, deleteTaskError: null });
      const res = await CalendarService.deleteTaskAPI(params);
      set({ deleteTaskResponse: res.payload });
    } catch (err: any) {
      set({ deleteTaskError: err?.message });
    } finally {
      set({ deleteTaskLoading: false });
    }
  },
  resetDeleteTask: () =>
    set({
      deleteTaskLoading: false,
      deleteTaskResponse: null,
      deleteTaskError: null,
    }),
}));
