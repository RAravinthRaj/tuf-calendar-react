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
  content: {
    container: {
      closeMobilePanelAriaLabel: "Close mobile panel",
    },
    monthGrid: {
      todayTodoLabel: "Today To-do",
      addTaskForTodayAriaLabel: "Add task for today",
      nothingPlannedForToday: "Nothing planned for today.",
      openTodayButton: "Open Today",
      previousMonthAriaLabel: "Previous month",
      nextMonthAriaLabel: "Next month",
      rangeLegend: {
        start: "Start",
        end: "End",
        inRange: "In Range",
      },
      clearRangeButton: "Clear Range",
      rangeHintPrefix: "Pick a start day, then an end day. Holidays this month:",
      holidayMarker: "Holiday",
    },
    entryPanel: {
      attachedScopeFallback: "Select a date range on the calendar",
      sections: {
        selectedDayNotes: "Selected Day Notes",
        rangeNotes: "Range Notes",
        holidayMarker: "Holiday Marker",
        integratedNotes: "Integrated Notes",
        particularDate: "Particular Date",
        selectedRange: "Selected Range",
        composer: "Task / Note Composer",
      },
      emptyStates: {
        noDayNotes: "No notes for this day yet.",
        noRangeNotes: "No range notes for this day.",
        noAttachedNotes: "No attached notes in this section yet.",
        noTasks: "No tasks",
      },
      noteMeta: {
        rangePrefix: "Range note:",
        rangeConnector: "to",
        monthMemoPrefix: "Month memo for",
        selectedDateNote: "Selected date note",
        rangeNotesCaptionFallback: "Notes linked to selected ranges",
      },
      holiday: {
        inputPlaceholder: "Example: Founders' Day",
        markedPrefix: "Marked as holiday:",
        hint:
          "Pick a date and give it a holiday label to show a popup and confetti when that day is opened.",
        updateButton: "Update Holiday",
        saveButton: "Save Holiday",
        removeButton: "Remove Holiday",
      },
      attachedNotes: {
        scopeOptions: [
          { key: "month", label: "Month Memo" },
          { key: "date", label: "Selected Date" },
          { key: "range", label: "Selected Range" },
        ] as const,
        rangeHint:
          "Select a start date and an end date on the grid to attach a note to a range.",
        textAreaPlaceholderPrefix: "Write a note for",
        updateButton: "Update Note",
        saveButton: "Save Note",
        cancelButton: "Cancel",
      },
      tasks: {
        editButton: "Edit",
        deleteButton: "Delete",
      },
      add: {
        particularDateHint: {
          note: "Add a note only for the selected day.",
          task: "Add a task only for the selected day.",
        },
        selectedRangeCaptionFallback: "Select a range on the calendar",
        selectedRangeHintActive:
          "Add across the selected range when the range is complete.",
        selectedRangeHintInactive:
          "Choose a start date and end date to add across multiple days.",
        notePlaceholder: "Write note",
        taskPlaceholder: "Write task",
        updateNoteButton: "Update Note",
        updateTaskButton: "Update Task",
        addNoteButton: "Add Note",
        addTaskButton: "Add Task",
        cancelButton: "Cancel",
      },
    },
  },
};

export type CalendarTabKey = (typeof CALENDAR_CONFIG.tabs)[number]["key"];
export type CalendarAddOptionKey =
  (typeof CALENDAR_CONFIG.addOptions)[number]["key"];
export type CalendarHeroKey = (typeof CALENDAR_CONFIG.months)[number]["key"];
