/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { CALENDAR_CONFIG } from "../../../config";

export interface CalendarNote {
  id: string;
  content: string;
  createdAt: string;
}

export interface CalendarTask {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface CalendarDateEntries {
  notes: CalendarNote[];
  tasks: CalendarTask[];
}

export type CalendarMonthEntries = Record<string, CalendarDateEntries>;

export interface CalendarApiResponse<T> {
  payload: T;
}

type CalendarStorageShape = Record<string, CalendarDateEntries>;

const createEmptyEntries = (): CalendarDateEntries => ({
  notes: [],
  tasks: [],
});

const getStorage = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
};

export const readCalendarDB = (): CalendarStorageShape => {
  const raw = getStorage()?.getItem(CALENDAR_CONFIG.storageKey);

  if (!raw) {
    return {};
  }

  try {
    return (JSON.parse(raw) as CalendarStorageShape) ?? {};
  } catch {
    return {};
  }
};

export const writeCalendarDB = (state: CalendarStorageShape) => {
  getStorage()?.setItem(CALENDAR_CONFIG.storageKey, JSON.stringify(state));
};

export const getDateEntries = (dateKey: string) => {
  const state = readCalendarDB();

  return state[dateKey] ?? createEmptyEntries();
};

export const getMonthEntries = (monthKey: string): CalendarMonthEntries => {
  const state = readCalendarDB();
  const monthEntries: CalendarMonthEntries = {};

  Object.entries(state).forEach(([dateKey, entries]) => {
    if (dateKey.startsWith(monthKey)) {
      monthEntries[dateKey] = entries;
    }
  });

  return monthEntries;
};

export const buildCalendarId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
