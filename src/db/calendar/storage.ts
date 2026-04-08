/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { CALENDAR_CONFIG } from "../../pages/Calendar/config";
import {
  CalendarDateEntries,
  CalendarMonthEntries,
  CalendarStorageShape,
} from "./types";

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

export const readStorageItem = <T>(key: string, fallback: T): T => {
  const raw = getStorage()?.getItem(key);

  if (!raw) {
    return fallback;
  }

  try {
    return (JSON.parse(raw) as T) ?? fallback;
  } catch {
    return fallback;
  }
};

export const writeStorageItem = <T>(key: string, value: T) => {
  getStorage()?.setItem(key, JSON.stringify(value));
};

export const readCalendarDB = (): CalendarStorageShape =>
  readStorageItem<CalendarStorageShape>(CALENDAR_CONFIG.storageKey, {});

export const writeCalendarDB = (state: CalendarStorageShape) => {
  writeStorageItem(CALENDAR_CONFIG.storageKey, state);
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

export const getAttachedNotesStorageKey = () =>
  `${CALENDAR_CONFIG.storageKey}-attached-notes`;

export const getHolidayStorageKey = () => `${CALENDAR_CONFIG.storageKey}-holidays`;

