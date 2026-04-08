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
  rangeStartDateKey: string | null;
  rangeEndDateKey: string | null;
  activeTab: CalendarTabKey;
  addMode: CalendarAddOptionKey;
  transitionDirection: "next" | "prev";
  selectDate: (date: Date, enableRangeSelection?: boolean) => void;
  goToMonth: (offset: number) => void;
  clearDateRange: () => void;
  setActiveTab: (tab: CalendarTabKey) => void;
  setAddMode: (mode: CalendarAddOptionKey) => void;
};

export const useCalendarUIStore = create<State>((set, get) => {
  const initialDate = new Date();

  return {
    selectedDateKey: formatDateKey(initialDate),
    visibleMonthKey: formatMonthKey(initialDate),
    rangeStartDateKey: null,
    rangeEndDateKey: null,
    activeTab: "notes",
    addMode: "note",
    transitionDirection: "next",

    selectDate: (date, enableRangeSelection = false) =>
      set((state) => {
        const nextDateKey = formatDateKey(date);

        if (!enableRangeSelection) {
          return {
            selectedDateKey: nextDateKey,
            visibleMonthKey: formatMonthKey(date),
          };
        }

        if (!state.rangeStartDateKey || state.rangeEndDateKey) {
          return {
            selectedDateKey: nextDateKey,
            visibleMonthKey: formatMonthKey(date),
            rangeStartDateKey: nextDateKey,
            rangeEndDateKey: null,
          };
        }

        if (nextDateKey === state.rangeStartDateKey) {
          return {
            selectedDateKey: nextDateKey,
            visibleMonthKey: formatMonthKey(date),
            rangeStartDateKey: nextDateKey,
            rangeEndDateKey: nextDateKey,
          };
        }

        return {
          selectedDateKey: nextDateKey,
          visibleMonthKey: formatMonthKey(date),
          rangeStartDateKey:
            nextDateKey < state.rangeStartDateKey
              ? nextDateKey
              : state.rangeStartDateKey,
          rangeEndDateKey:
            nextDateKey < state.rangeStartDateKey
              ? state.rangeStartDateKey
              : nextDateKey,
        };
      }),

    goToMonth: (offset) => {
      const nextDate = getNextMonthSelectedDate(get().selectedDateKey, offset);

      set({
        selectedDateKey: formatDateKey(nextDate),
        visibleMonthKey: formatMonthKey(nextDate),
        transitionDirection: offset >= 0 ? "next" : "prev",
      });
    },

    clearDateRange: () =>
      set({
        rangeStartDateKey: null,
        rangeEndDateKey: null,
      }),

    setActiveTab: (tab) => set({ activeTab: tab }),
    setAddMode: (mode) => set({ addMode: mode }),
  };
});
