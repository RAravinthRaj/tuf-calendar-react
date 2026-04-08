/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "../../hooks";
import {
  ContainerComp,
  EntryPanel,
  HeroSection,
  MonthGrid,
  TabSwitcher,
} from "./components";
import { CALENDAR_CONFIG } from "./config";
import CalendarService, { CalendarTask } from "./services";
import {
  useAddNoteStore,
  useAddTaskStore,
  useCalendarUIStore,
  useDeleteNoteStore,
  useDeleteTaskStore,
  useFetchMonthEntriesStore,
  useFetchNotesStore,
  useFetchTasksStore,
  useToggleTaskStore,
  useUpdateNoteStore,
  useUpdateTaskStore,
} from "./stores";
import {
  getCalendarDays,
  getDateFromKey,
  getMonthDateFromKey,
} from "./utils/date";

const CalendarPage = () => {
  const theme = useTheme();
  const {
    selectedDateKey,
    visibleMonthKey,
    activeTab,
    addMode,
    transitionDirection,
    selectDate,
    goToMonth,
    setActiveTab,
    setAddMode,
  } = useCalendarUIStore();
  const { fetchNotesResponse, fetchFetchNotes, resetFetchNotes } =
    useFetchNotesStore();
  const { fetchTasksResponse, fetchFetchTasks, resetFetchTasks } =
    useFetchTasksStore();
  const { addNoteResponse, addNoteError, fetchAddNote, resetAddNote } =
    useAddNoteStore();
  const { addTaskResponse, addTaskError, fetchAddTask, resetAddTask } =
    useAddTaskStore();
  const { updateNoteResponse, updateNoteError, fetchUpdateNote, resetUpdateNote } =
    useUpdateNoteStore();
  const { deleteNoteResponse, deleteNoteError, fetchDeleteNote, resetDeleteNote } =
    useDeleteNoteStore();
  const { updateTaskResponse, updateTaskError, fetchUpdateTask, resetUpdateTask } =
    useUpdateTaskStore();
  const { deleteTaskResponse, deleteTaskError, fetchDeleteTask, resetDeleteTask } =
    useDeleteTaskStore();
  const { toggleTaskResponse, fetchToggleTask, resetToggleTask } =
    useToggleTaskStore();
  const { fetchMonthEntriesResponse, fetchFetchMonthEntries } =
    useFetchMonthEntriesStore();
  const [draft, setDraft] = useState("");
  const [todayTasks, setTodayTasks] = useState<CalendarTask[]>([]);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<{
    type: "note" | "task";
    id: string;
  } | null>(null);
  const todayDateKey = new Date().toISOString().slice(0, 10);

  const isMobileViewport = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  useEffect(() => {
    resetFetchNotes();
    resetFetchTasks();
    void fetchFetchNotes(selectedDateKey);
    void fetchFetchTasks(selectedDateKey);
  }, [selectedDateKey]);

  useEffect(() => {
    void fetchFetchMonthEntries(visibleMonthKey);
  }, [visibleMonthKey]);

  useEffect(() => {
    const loadTodayTasks = async () => {
      const res = await CalendarService.fetchTasksAPI(todayDateKey);
      setTodayTasks(res.payload);
    };

    void loadTodayTasks();
  }, [
    todayDateKey,
    addTaskResponse,
    updateTaskResponse,
    deleteTaskResponse,
    toggleTaskResponse,
  ]);

  useEffect(() => {
    if (addNoteResponse) {
      setDraft("");
      setEditingEntry(null);
      setActiveTab("notes");
      resetAddNote();
      void fetchFetchNotes(selectedDateKey);
      void fetchFetchMonthEntries(visibleMonthKey);
    }
  }, [addNoteResponse]);

  useEffect(() => {
    if (addTaskResponse) {
      setDraft("");
      setEditingEntry(null);
      setActiveTab("tasks");
      resetAddTask();
      void fetchFetchTasks(selectedDateKey);
      void fetchFetchMonthEntries(visibleMonthKey);
    }
  }, [addTaskResponse]);

  useEffect(() => {
    if (updateNoteResponse) {
      setDraft("");
      setEditingEntry(null);
      setActiveTab("notes");
      resetUpdateNote();
      void fetchFetchNotes(selectedDateKey);
      void fetchFetchMonthEntries(visibleMonthKey);
    }
  }, [updateNoteResponse]);

  useEffect(() => {
    if (deleteNoteResponse) {
      if (editingEntry?.type === "note") {
        setDraft("");
        setEditingEntry(null);
      }
      resetDeleteNote();
      void fetchFetchNotes(selectedDateKey);
      void fetchFetchMonthEntries(visibleMonthKey);
    }
  }, [deleteNoteResponse]);

  useEffect(() => {
    if (updateTaskResponse) {
      setDraft("");
      setEditingEntry(null);
      setActiveTab("tasks");
      resetUpdateTask();
      void fetchFetchTasks(selectedDateKey);
      void fetchFetchMonthEntries(visibleMonthKey);
    }
  }, [updateTaskResponse]);

  useEffect(() => {
    if (deleteTaskResponse) {
      if (editingEntry?.type === "task") {
        setDraft("");
        setEditingEntry(null);
      }
      resetDeleteTask();
      void fetchFetchTasks(selectedDateKey);
      void fetchFetchMonthEntries(visibleMonthKey);
    }
  }, [deleteTaskResponse]);

  useEffect(() => {
    if (toggleTaskResponse) {
      resetToggleTask();
      void fetchFetchTasks(selectedDateKey);
      void fetchFetchMonthEntries(visibleMonthKey);
    }
  }, [toggleTaskResponse]);

  const selectedDate = getDateFromKey(selectedDateKey);
  const visibleMonthDate = getMonthDateFromKey(visibleMonthKey);
  const monthMeta = CALENDAR_CONFIG.months[visibleMonthDate.getMonth()];
  const days = getCalendarDays(visibleMonthKey, selectedDateKey);
  const selectedDateLabel = selectedDate.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const monthGridTitle = visibleMonthDate.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  const entryCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    Object.entries(fetchMonthEntriesResponse ?? {}).forEach(
      ([dateKey, entries]) => {
        counts[dateKey] = entries.notes.length + entries.tasks.length;
      },
    );

    return counts;
  }, [fetchMonthEntriesResponse]);

  const handleSave = () => {
    if (editingEntry?.type === "note") {
      void fetchUpdateNote({
        dateKey: selectedDateKey,
        noteId: editingEntry.id,
        content: draft,
      });
      return;
    }

    if (editingEntry?.type === "task") {
      void fetchUpdateTask({
        dateKey: selectedDateKey,
        taskId: editingEntry.id,
        title: draft,
      });
      return;
    }

    if (addMode === "note") {
      void fetchAddNote({
        dateKey: selectedDateKey,
        content: draft,
      });
      return;
    }

    void fetchAddTask({
      dateKey: selectedDateKey,
      title: draft,
    });
  };

  const handleEditNote = (noteId: string, content: string) => {
    setActiveTab("add");
    setAddMode("note");
    setEditingEntry({ type: "note", id: noteId });
    setDraft(content);
  };

  const handleEditTask = (taskId: string, title: string) => {
    setActiveTab("add");
    setAddMode("task");
    setEditingEntry({ type: "task", id: taskId });
    setDraft(title);
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
    setDraft("");
  };

  const handleDeleteNote = (noteId: string) => {
    void fetchDeleteNote({
      dateKey: selectedDateKey,
      noteId,
    });
  };

  const handleDeleteTask = (taskId: string) => {
    void fetchDeleteTask({
      dateKey: selectedDateKey,
      taskId,
    });
  };

  const handleToggleTask = (taskId: string) => {
    void fetchToggleTask({
      dateKey: selectedDateKey,
      taskId,
    });
  };

  const handleAddTodayTask = () => {
    selectDate(new Date());
    setActiveTab("add");
    setAddMode("task");
    setEditingEntry(null);
    setDraft("");

    if (isMobileViewport()) {
      setMobilePanelOpen(true);
    }
  };

  const handleOpenTodayTask = () => {
    setActiveTab("tasks");
    selectDate(new Date());

    if (isMobileViewport()) {
      setMobilePanelOpen(true);
    }
  };

  return (
    <ContainerComp
      selectedDateLabel={selectedDateLabel}
      mobilePanelOpen={mobilePanelOpen}
      onCloseMobilePanel={() => setMobilePanelOpen(false)}
      direction={transitionDirection}
      heroSection={
        <HeroSection
          key={visibleMonthKey}
          heroImage={theme.images.calendarHeroes[monthMeta.key]}
          monthLabel={monthMeta.label}
          accentColor={monthMeta.accent}
          direction={transitionDirection}
        />
      }
      monthGrid={
        <MonthGrid
          key={visibleMonthKey}
          title={monthGridTitle}
          weekdays={CALENDAR_CONFIG.weekdays}
          days={days}
          entryCounts={entryCounts}
          accentColor={monthMeta.accent}
          direction={transitionDirection}
          todayTasks={todayTasks}
          onOpenTask={handleOpenTodayTask}
          onAddTodayTask={handleAddTodayTask}
          onPreviousMonth={() => goToMonth(-1)}
          onNextMonth={() => goToMonth(1)}
          onSelectDate={(date) => selectDate(date)}
        />
      }
      themeLabel={theme.themeMode === "light" ? "Dark Sky" : "White Light"}
      onThemeToggle={theme.toggleTheme}
      panelTabs={
        <TabSwitcher
          tabs={CALENDAR_CONFIG.tabs}
          activeTab={activeTab}
          accentColor={monthMeta.accent}
          onTabPress={(tab) => setActiveTab(tab)}
        />
      }
      panelContent={
        <EntryPanel
          activeTab={activeTab}
          addMode={addMode}
          notes={fetchNotesResponse ?? []}
          tasks={fetchTasksResponse ?? []}
          draft={draft}
          accentColor={monthMeta.accent}
          addOptions={CALENDAR_CONFIG.addOptions}
          editingLabel={
            editingEntry
              ? editingEntry.type === "note"
                ? "Editing note"
                : "Editing task"
              : null
          }
          errorMessage={
            addNoteError ||
            addTaskError ||
            updateNoteError ||
            updateTaskError ||
            deleteNoteError ||
            deleteTaskError
          }
          onDraftChange={setDraft}
          onAddModePress={(mode) => setAddMode(mode)}
          onSave={handleSave}
          onCancelEdit={handleCancelEdit}
          onToggleTask={handleToggleTask}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      }
    />
  );
};

export default CalendarPage;
