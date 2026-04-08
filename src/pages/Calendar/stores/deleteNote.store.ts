/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { create } from "zustand";
import CalendarService, { CalendarNote, DeleteNoteParams } from "../services";

type State = {
  deleteNoteLoading: boolean;
  deleteNoteResponse: CalendarNote[] | null;
  deleteNoteError: string | null;
  fetchDeleteNote: (params: DeleteNoteParams) => Promise<void>;
  resetDeleteNote: () => void;
};

export const useDeleteNoteStore = create<State>((set) => ({
  deleteNoteLoading: false,
  deleteNoteResponse: null,
  deleteNoteError: null,
  fetchDeleteNote: async (params) => {
    try {
      set({ deleteNoteLoading: true, deleteNoteError: null });
      const res = await CalendarService.deleteNoteAPI(params);
      set({ deleteNoteResponse: res.payload });
    } catch (err: any) {
      set({ deleteNoteError: err?.message });
    } finally {
      set({ deleteNoteLoading: false });
    }
  },
  resetDeleteNote: () =>
    set({
      deleteNoteLoading: false,
      deleteNoteResponse: null,
      deleteNoteError: null,
    }),
}));
