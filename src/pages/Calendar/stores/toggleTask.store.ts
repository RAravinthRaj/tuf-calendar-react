/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { create } from "zustand";
import CalendarService, { CalendarTask, ToggleTaskParams } from "../services";

type State = {
  toggleTaskLoading: boolean;
  toggleTaskResponse: CalendarTask[] | null;
  toggleTaskError: string | null;
  fetchToggleTask: (params: ToggleTaskParams) => Promise<void>;
  resetToggleTask: () => void;
};

export const useToggleTaskStore = create<State>((set) => ({
  toggleTaskLoading: false,
  toggleTaskResponse: null,
  toggleTaskError: null,

  fetchToggleTask: async (params: ToggleTaskParams) => {
    try {
      set({ toggleTaskLoading: true, toggleTaskError: null });
      const res = await CalendarService.toggleTaskAPI(params);
      set({ toggleTaskResponse: res.payload });
    } catch (err: any) {
      set({ toggleTaskError: err?.message });
    } finally {
      set({ toggleTaskLoading: false });
    }
  },

  resetToggleTask: () => {
    set({
      toggleTaskLoading: false,
      toggleTaskResponse: null,
      toggleTaskError: null,
    });
  },
}));
