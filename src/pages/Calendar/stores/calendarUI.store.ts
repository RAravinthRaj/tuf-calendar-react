/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { create } from "zustand";
import { CalendarAddOptionKey, CalendarTabKey } from "../config";
import {
  formatDateKey,
  formatMonthKey,
  getNextMonthSelectedDate,
} from "../utils/date";

type State = {
  selectedDateKey: string;
  visibleMonthKey: string;
  activeTab: CalendarTabKey;
  addMode: CalendarAddOptionKey;
  transitionDirection: "next" | "prev";
  selectDate: (date: Date) => void;
  goToMonth: (offset: number) => void;
  setActiveTab: (tab: CalendarTabKey) => void;
  setAddMode: (mode: CalendarAddOptionKey) => void;
};

export const useCalendarUIStore = create<State>((set, get) => {
  const initialDate = new Date();

  return {
    selectedDateKey: formatDateKey(initialDate),
    visibleMonthKey: formatMonthKey(initialDate),
    activeTab: "notes",
    addMode: "note",
    transitionDirection: "next",

    selectDate: (date) =>
      set({
        selectedDateKey: formatDateKey(date),
        visibleMonthKey: formatMonthKey(date),
      }),

    goToMonth: (offset) => {
      const nextDate = getNextMonthSelectedDate(get().selectedDateKey, offset);

      set({
        selectedDateKey: formatDateKey(nextDate),
        visibleMonthKey: formatMonthKey(nextDate),
        transitionDirection: offset >= 0 ? "next" : "prev",
      });
    },

    setActiveTab: (tab) => set({ activeTab: tab }),
    setAddMode: (mode) => set({ addMode: mode }),
  };
});
