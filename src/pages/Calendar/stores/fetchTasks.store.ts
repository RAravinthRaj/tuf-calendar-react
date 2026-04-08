/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { create } from "zustand";
import CalendarService, { CalendarTask } from "../services";

type State = {
  fetchTasksLoading: boolean;
  fetchTasksResponse: CalendarTask[] | null;
  fetchTasksError: string | null;
  fetchFetchTasks: (dateKey: string) => Promise<void>;
  resetFetchTasks: () => void;
};

export const useFetchTasksStore = create<State>((set) => ({
  fetchTasksLoading: false,
  fetchTasksResponse: null,
  fetchTasksError: null,

  fetchFetchTasks: async (dateKey: string) => {
    try {
      set({ fetchTasksLoading: true, fetchTasksError: null });
      const res = await CalendarService.fetchTasksAPI(dateKey);
      set({ fetchTasksResponse: res.payload });
    } catch (err: any) {
      set({ fetchTasksError: err?.message });
    } finally {
      set({ fetchTasksLoading: false });
    }
  },

  resetFetchTasks: () => {
    set({
      fetchTasksLoading: false,
      fetchTasksResponse: null,
      fetchTasksError: null,
    });
  },
}));
