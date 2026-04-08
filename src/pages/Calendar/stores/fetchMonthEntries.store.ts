/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { create } from "zustand";
import CalendarService, { CalendarMonthEntries } from "../services";

type State = {
  fetchMonthEntriesLoading: boolean;
  fetchMonthEntriesResponse: CalendarMonthEntries | null;
  fetchMonthEntriesError: string | null;
  fetchFetchMonthEntries: (monthKey: string) => Promise<void>;
  resetFetchMonthEntries: () => void;
};

export const useFetchMonthEntriesStore = create<State>((set) => ({
  fetchMonthEntriesLoading: false,
  fetchMonthEntriesResponse: null,
  fetchMonthEntriesError: null,

  fetchFetchMonthEntries: async (monthKey: string) => {
    try {
      set({
        fetchMonthEntriesLoading: true,
        fetchMonthEntriesError: null,
      });
      const res = await CalendarService.fetchMonthEntriesAPI(monthKey);
      set({ fetchMonthEntriesResponse: res.payload });
    } catch (err: any) {
      set({ fetchMonthEntriesError: err?.message });
    } finally {
      set({ fetchMonthEntriesLoading: false });
    }
  },

  resetFetchMonthEntries: () => {
    set({
      fetchMonthEntriesLoading: false,
      fetchMonthEntriesResponse: null,
      fetchMonthEntriesError: null,
    });
  },
}));
