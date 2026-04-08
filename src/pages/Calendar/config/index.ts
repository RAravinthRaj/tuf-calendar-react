/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
export const CALENDAR_CONFIG = {
  storageKey: "wall-calendar-entries",
  weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  title: "Wall Calendar",
  tabs: [
    { key: "notes", label: "Notes" },
    { key: "tasks", label: "Tasks" },
    { key: "add", label: "Add" },
  ],
  addOptions: [
    { key: "note", label: "Note" },
    { key: "task", label: "Task" },
  ],
  months: [
    { key: "january", label: "January", accent: "#1E9CE5" },
    { key: "february", label: "February", accent: "#D7708A" },
    { key: "march", label: "March", accent: "#7AA64C" },
    { key: "april", label: "April", accent: "#6FBB74" },
    { key: "may", label: "May", accent: "#C97A42" },
    { key: "june", label: "June", accent: "#4C9FB0" },
    { key: "july", label: "July", accent: "#2E77B8" },
    { key: "august", label: "August", accent: "#6F5CB8" },
    { key: "september", label: "September", accent: "#9A5E39" },
    { key: "october", label: "October", accent: "#B55A33" },
    { key: "november", label: "November", accent: "#7D7367" },
    { key: "december", label: "December", accent: "#5A86B3" },
  ] as const,
};

export type CalendarTabKey = (typeof CALENDAR_CONFIG.tabs)[number]["key"];
export type CalendarAddOptionKey =
  (typeof CALENDAR_CONFIG.addOptions)[number]["key"];
export type CalendarHeroKey = (typeof CALENDAR_CONFIG.months)[number]["key"];
