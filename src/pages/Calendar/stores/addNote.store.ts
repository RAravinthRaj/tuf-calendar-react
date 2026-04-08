/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { create } from "zustand";
import CalendarService, { AddNoteParams, CalendarNote } from "../services";

type State = {
  addNoteLoading: boolean;
  addNoteResponse: CalendarNote[] | null;
  addNoteError: string | null;
  fetchAddNote: (params: AddNoteParams) => Promise<void>;
  resetAddNote: () => void;
};

export const useAddNoteStore = create<State>((set) => ({
  addNoteLoading: false,
  addNoteResponse: null,
  addNoteError: null,

  fetchAddNote: async (params: AddNoteParams) => {
    try {
      set({ addNoteLoading: true, addNoteError: null });
      const res = await CalendarService.addNoteAPI(params);
      set({ addNoteResponse: res.payload });
    } catch (err: any) {
      set({ addNoteError: err?.message });
    } finally {
      set({ addNoteLoading: false });
    }
  },

  resetAddNote: () => {
    set({
      addNoteLoading: false,
      addNoteResponse: null,
      addNoteError: null,
    });
  },
}));
