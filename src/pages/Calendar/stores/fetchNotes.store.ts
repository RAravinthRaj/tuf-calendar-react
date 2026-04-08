/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { create } from "zustand";
import CalendarService, { CalendarNote } from "../services";

type State = {
  fetchNotesLoading: boolean;
  fetchNotesResponse: CalendarNote[] | null;
  fetchNotesError: string | null;
  fetchFetchNotes: (dateKey: string) => Promise<void>;
  resetFetchNotes: () => void;
};

export const useFetchNotesStore = create<State>((set) => ({
  fetchNotesLoading: false,
  fetchNotesResponse: null,
  fetchNotesError: null,

  fetchFetchNotes: async (dateKey: string) => {
    try {
      set({ fetchNotesLoading: true, fetchNotesError: null });
      const res = await CalendarService.fetchNotesAPI(dateKey);
      set({ fetchNotesResponse: res.payload });
    } catch (err: any) {
      set({ fetchNotesError: err?.message });
    } finally {
      set({ fetchNotesLoading: false });
    }
  },

  resetFetchNotes: () => {
    set({
      fetchNotesLoading: false,
      fetchNotesResponse: null,
      fetchNotesError: null,
    });
  },
}));
