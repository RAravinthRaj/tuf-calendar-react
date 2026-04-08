/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { create } from "zustand";
import CalendarService, { CalendarNote, UpdateNoteParams } from "../services";

type State = {
  updateNoteLoading: boolean;
  updateNoteResponse: CalendarNote[] | null;
  updateNoteError: string | null;
  fetchUpdateNote: (params: UpdateNoteParams) => Promise<void>;
  resetUpdateNote: () => void;
};

export const useUpdateNoteStore = create<State>((set) => ({
  updateNoteLoading: false,
  updateNoteResponse: null,
  updateNoteError: null,
  fetchUpdateNote: async (params) => {
    try {
      set({ updateNoteLoading: true, updateNoteError: null });
      const res = await CalendarService.updateNoteAPI(params);
      set({ updateNoteResponse: res.payload });
    } catch (err: any) {
      set({ updateNoteError: err?.message });
    } finally {
      set({ updateNoteLoading: false });
    }
  },
  resetUpdateNote: () =>
    set({
      updateNoteLoading: false,
      updateNoteResponse: null,
      updateNoteError: null,
    }),
}));
