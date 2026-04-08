/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { useEffect, useMemo, useState } from "react";
import Confetti from "react-confetti";
import { useTheme } from "../../hooks";
import { Loader } from "../../components";
import {
  ContainerComp,
  EntryPanel,
  HeroSection,
  MonthGrid,
  TabSwitcher,
} from "./components";
import { CALENDAR_CONFIG } from "./config";
import CalendarService from "./services";

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
  formatDateKey,
  getCalendarDays,
  getDateFromKey,
  getDateKeysInRange,
  getMonthDateFromKey,
} from "../../utils/date";
import {
  CalendarAttachedNote,
  CalendarHoliday,
  CalendarNoteScope,
  CalendarTask,
} from "../../db";

const CalendarPage = () => {
  const theme = useTheme();
  const {
    selectedDateKey,
    visibleMonthKey,
    rangeStartDateKey,
    rangeEndDateKey,
    activeTab,
    addMode,
    transitionDirection,
    selectDate,
    goToMonth,
    clearDateRange,
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
  const {
    updateNoteResponse,
    updateNoteError,
    fetchUpdateNote,
    resetUpdateNote,
  } = useUpdateNoteStore();
  const {
    deleteNoteResponse,
    deleteNoteError,
    fetchDeleteNote,
    resetDeleteNote,
  } = useDeleteNoteStore();
  const {
    updateTaskResponse,
    updateTaskError,
    fetchUpdateTask,
    resetUpdateTask,
  } = useUpdateTaskStore();
  const {
    deleteTaskResponse,
    deleteTaskError,
    fetchDeleteTask,
    resetDeleteTask,
  } = useDeleteTaskStore();
  const { toggleTaskResponse, fetchToggleTask, resetToggleTask } =
    useToggleTaskStore();
  const { fetchMonthEntriesResponse, fetchFetchMonthEntries } =
    useFetchMonthEntriesStore();
  const [draft, setDraft] = useState("");
  const [todayTasks, setTodayTasks] = useState<CalendarTask[]>([]);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const [attachedNoteDraft, setAttachedNoteDraft] = useState("");
  const [attachedNotes, setAttachedNotes] = useState<CalendarAttachedNote[]>(
    [],
  );
  const [attachedNoteScope, setAttachedNoteScope] =
    useState<CalendarNoteScope>("month");
  const [attachedNoteError, setAttachedNoteError] = useState<string | null>(
    null,
  );
  const [editingAttachedNote, setEditingAttachedNote] =
    useState<CalendarAttachedNote | null>(null);
  const [rangeAddError, setRangeAddError] = useState<string | null>(null);
  const [holidayDraft, setHolidayDraft] = useState("");
  const [holidayError, setHolidayError] = useState<string | null>(null);
  const [monthHolidays, setMonthHolidays] = useState<
    Record<string, CalendarHoliday>
  >({});
  const [activeHoliday, setActiveHoliday] = useState<CalendarHoliday | null>(
    null,
  );
  const [showHolidayCelebration, setShowHolidayCelebration] = useState(false);
  const [confettiBurstKey, setConfettiBurstKey] = useState(0);
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [editingEntry, setEditingEntry] = useState<{
    type: "note" | "task";
    id: string;
  } | null>(null);
  const todayDateKey = new Date().toISOString().slice(0, 10);

  const isMobileViewport = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, []);

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
    setMonthHolidays(CalendarService.getMonthHolidaysAPI(visibleMonthKey));
  }, [visibleMonthKey, selectedDateKey]);

  useEffect(() => {
    setAttachedNotes(
      CalendarService.getAttachedNotesAPI({
        scope: attachedNoteScope,
        monthKey: visibleMonthKey,
        dateKey: selectedDateKey,
        startDateKey: rangeStartDateKey ?? undefined,
        endDateKey: rangeEndDateKey ?? undefined,
      }),
    );
  }, [
    attachedNoteScope,
    selectedDateKey,
    visibleMonthKey,
    rangeStartDateKey,
    rangeEndDateKey,
  ]);

  useEffect(() => {
    const updateViewportSize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window === "undefined") {
      return;
    }

    updateViewportSize();
    window.addEventListener("resize", updateViewportSize);

    return () => window.removeEventListener("resize", updateViewportSize);
  }, []);

  useEffect(() => {
    const holiday = CalendarService.getHolidayAPI(selectedDateKey);

    setHolidayDraft(holiday?.label ?? "");

    if (!holiday) {
      setActiveHoliday(null);
      setShowHolidayCelebration(false);
      return;
    }

    setActiveHoliday(holiday);
    setShowHolidayCelebration(true);
    setConfettiBurstKey((value) => value + 1);
  }, [selectedDateKey]);

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
  const days = getCalendarDays(
    visibleMonthKey,
    selectedDateKey,
    rangeStartDateKey,
    rangeEndDateKey,
    Object.keys(monthHolidays),
  );
  const hasActiveRange = !!rangeStartDateKey;
  const hasCompletedRange = !!(rangeStartDateKey && rangeEndDateKey);
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
  const selectedRangeLabel =
    rangeStartDateKey && rangeEndDateKey
      ? `${getDateFromKey(rangeStartDateKey).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })} - ${getDateFromKey(rangeEndDateKey).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}`
      : rangeStartDateKey
        ? `Starting ${getDateFromKey(rangeStartDateKey).toLocaleDateString(
            undefined,
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            },
          )}`
        : null;
  const panelDateLabel = selectedRangeLabel ?? selectedDateLabel;
  const addTargetLabel = editingEntry
    ? editingEntry.type === "note"
      ? `Updating the note for ${selectedDateLabel}.`
      : `Updating the task for ${selectedDateLabel}.`
    : hasCompletedRange
      ? `${addMode === "note" ? "This note" : "This task"} will be added to all ${
          getDateKeysInRange(rangeStartDateKey!, rangeEndDateKey!).length
        } dates in ${selectedRangeLabel}.`
      : `${addMode === "note" ? "This note" : "This task"} will be added to ${selectedDateLabel}.`;
  const selectedDayAttachedNotes = useMemo(
    () =>
      CalendarService.getAttachedNotesForDateAPI({
        monthKey: visibleMonthKey,
        dateKey: selectedDateKey,
      }),
    [visibleMonthKey, selectedDateKey, attachedNotes, attachedNoteScope],
  );

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
    setRangeAddError(null);

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

    if (hasCompletedRange) {
      const dateKeys = getDateKeysInRange(rangeStartDateKey!, rangeEndDateKey!);

      void (async () => {
        try {
          if (addMode === "note") {
            await Promise.all(
              dateKeys.map((dateKey) =>
                CalendarService.addNoteAPI({
                  dateKey,
                  content: draft,
                }),
              ),
            );
          } else {
            await Promise.all(
              dateKeys.map((dateKey) =>
                CalendarService.addTaskAPI({
                  dateKey,
                  title: draft,
                }),
              ),
            );
          }

          setDraft("");
          setEditingEntry(null);
          setActiveTab(addMode === "note" ? "notes" : "tasks");
          await fetchFetchNotes(selectedDateKey);
          await fetchFetchTasks(selectedDateKey);
          await fetchFetchMonthEntries(visibleMonthKey);
        } catch (error: any) {
          setRangeAddError(
            error?.message ?? "Unable to save across the selected range.",
          );
        }
      })();

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

  const handleSelectDate = (date: Date) => {
    const nextDateKey = formatDateKey(date);
    const holiday = CalendarService.getHolidayAPI(nextDateKey);

    selectDate(date, true);
    setAttachedNoteError(null);
    setHolidayError(null);

    if (holiday) {
      setActiveHoliday(holiday);
      setShowHolidayCelebration(false);

      // Force a fresh confetti run even when the same holiday is clicked again.
      setTimeout(() => {
        setShowHolidayCelebration(true);
        setConfettiBurstKey((value) => value + 1);
      }, 0);
    }
  };

  const handleSaveAttachedNote = () => {
    try {
      const notes = CalendarService.saveAttachedNoteAPI({
        noteId: editingAttachedNote?.id,
        scope: attachedNoteScope,
        monthKey: visibleMonthKey,
        content: attachedNoteDraft,
        dateKey:
          attachedNoteScope === "date"
            ? editingAttachedNote?.scope === "date"
              ? editingAttachedNote.dateKey
              : selectedDateKey
            : undefined,
        startDateKey:
          attachedNoteScope === "range"
            ? editingAttachedNote?.scope === "range"
              ? editingAttachedNote.startDateKey
              : (rangeStartDateKey ?? undefined)
            : undefined,
        endDateKey:
          attachedNoteScope === "range"
            ? editingAttachedNote?.scope === "range"
              ? editingAttachedNote.endDateKey
              : (rangeEndDateKey ?? undefined)
            : undefined,
      });

      setAttachedNotes(notes);
      setAttachedNoteDraft("");
      setAttachedNoteError(null);
      setEditingAttachedNote(null);
    } catch (error: any) {
      setAttachedNoteError(error?.message ?? "Unable to save note.");
    }
  };

  const handleDeleteAttachedNote = (noteId: string) => {
    try {
      CalendarService.deleteAttachedNoteAPI(noteId);
      setAttachedNotes(
        CalendarService.getAttachedNotesAPI({
          scope: attachedNoteScope,
          monthKey: visibleMonthKey,
          dateKey: selectedDateKey,
          startDateKey: rangeStartDateKey ?? undefined,
          endDateKey: rangeEndDateKey ?? undefined,
        }),
      );

      if (editingAttachedNote?.id === noteId) {
        setAttachedNoteDraft("");
        setEditingAttachedNote(null);
      }

      setAttachedNoteError(null);
    } catch (error: any) {
      setAttachedNoteError(error?.message ?? "Unable to delete note.");
    }
  };

  const handleEditAttachedNote = (note: CalendarAttachedNote) => {
    setAttachedNoteScope(note.scope);
    setAttachedNoteDraft(note.content);
    setEditingAttachedNote(note);
    setAttachedNoteError(null);
  };

  const handleCancelAttachedNoteEdit = () => {
    setAttachedNoteDraft("");
    setEditingAttachedNote(null);
    setAttachedNoteError(null);
  };

  const handleSaveHoliday = () => {
    try {
      const holiday = CalendarService.saveHolidayAPI({
        dateKey: selectedDateKey,
        label: holidayDraft,
      });

      setMonthHolidays(CalendarService.getMonthHolidaysAPI(visibleMonthKey));
      setActiveHoliday(holiday);
      setShowHolidayCelebration(true);
      setConfettiBurstKey((value) => value + 1);
      setHolidayError(null);
    } catch (error: any) {
      setHolidayError(error?.message ?? "Unable to save holiday.");
    }
  };

  const handleDeleteHoliday = () => {
    try {
      CalendarService.deleteHolidayAPI(selectedDateKey);
      setMonthHolidays(CalendarService.getMonthHolidaysAPI(visibleMonthKey));
      setHolidayDraft("");
      setHolidayError(null);
    } catch (error: any) {
      setHolidayError(error?.message ?? "Unable to remove holiday.");
    }
  };

  if (isInitialLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--app-bg)",
          padding: "24px",
        }}
      >
        <Loader loadingText="Loading calendar..." />
      </div>
    );
  }

  return (
    <ContainerComp
      selectedDateLabel={panelDateLabel}
      themeMode={theme.themeMode}
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
          hasActiveRange={hasActiveRange}
          holidayCount={Object.keys(monthHolidays).length}
          onOpenTask={handleOpenTodayTask}
          onAddTodayTask={handleAddTodayTask}
          onPreviousMonth={() => goToMonth(-1)}
          onNextMonth={() => goToMonth(1)}
          onClearRange={clearDateRange}
          onSelectDate={handleSelectDate}
        />
      }
      themeLabel={theme.themeMode === "light" ? "Black" : "White"}
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
          selectedDayAttachedNotes={selectedDayAttachedNotes}
          tasks={fetchTasksResponse ?? []}
          attachedNotes={attachedNotes}
          draft={draft}
          attachedNoteDraft={attachedNoteDraft}
          attachedNoteScope={attachedNoteScope}
          accentColor={monthMeta.accent}
          addOptions={CALENDAR_CONFIG.addOptions}
          editingLabel={
            editingEntry
              ? editingEntry.type === "note"
                ? "Editing note"
                : "Editing task"
              : null
          }
          attachedNoteEditingLabel={
            editingAttachedNote ? "Editing attached note" : null
          }
          monthLabel={monthGridTitle}
          selectedDateLabel={selectedDateLabel}
          selectedRangeLabel={selectedRangeLabel}
          addTargetLabel={addTargetLabel}
          holidayDraft={holidayDraft}
          holidayLabel={monthHolidays[selectedDateKey]?.label ?? null}
          holidayError={holidayError}
          hasActiveRange={!!(rangeStartDateKey && rangeEndDateKey)}
          errorMessage={
            rangeAddError ||
            addNoteError ||
            addTaskError ||
            updateNoteError ||
            updateTaskError ||
            deleteNoteError ||
            deleteTaskError
          }
          attachedNoteError={attachedNoteError}
          onDraftChange={setDraft}
          onAttachedNoteDraftChange={setAttachedNoteDraft}
          onAttachedNoteScopeChange={(scope) => {
            setAttachedNoteScope(scope);
            setAttachedNoteDraft("");
            setEditingAttachedNote(null);
            setAttachedNoteError(null);
          }}
          onHolidayDraftChange={setHolidayDraft}
          onAddModePress={(mode) => setAddMode(mode)}
          onSave={handleSave}
          onCancelEdit={handleCancelEdit}
          onSaveAttachedNote={handleSaveAttachedNote}
          onCancelAttachedNoteEdit={handleCancelAttachedNoteEdit}
          onSaveHoliday={handleSaveHoliday}
          onDeleteHoliday={handleDeleteHoliday}
          onToggleTask={handleToggleTask}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
          onEditAttachedNote={handleEditAttachedNote}
          onDeleteAttachedNote={handleDeleteAttachedNote}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      }
      overlayContent={
        showHolidayCelebration && activeHoliday ? (
          <>
            <Confetti
              key={`left-${confettiBurstKey}`}
              width={viewportSize.width}
              height={viewportSize.height}
              numberOfPieces={160}
              recycle={false}
              run={showHolidayCelebration}
              tweenDuration={700}
              confettiSource={{
                x: 0,
                y: Math.max(viewportSize.height * 0.35, 0),
                w: 0,
                h: 0,
              }}
              initialVelocityX={{ min: 8, max: 18 }}
              initialVelocityY={{ min: -16, max: -6 }}
              gravity={0.22}
              wind={0.02}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1500,
                pointerEvents: "none",
              }}
            />
            <Confetti
              key={`right-${confettiBurstKey}`}
              width={viewportSize.width}
              height={viewportSize.height}
              numberOfPieces={160}
              recycle={false}
              run={showHolidayCelebration}
              tweenDuration={700}
              confettiSource={{
                x: Math.max(viewportSize.width, 0),
                y: Math.max(viewportSize.height * 0.35, 0),
                w: 0,
                h: 0,
              }}
              initialVelocityX={{ min: -18, max: -8 }}
              initialVelocityY={{ min: -16, max: -6 }}
              gravity={0.22}
              wind={-0.02}
              onConfettiComplete={() => setShowHolidayCelebration(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1500,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 1400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "20px",
                background: "rgba(21, 14, 8, 0.42)",
                backdropFilter: "blur(8px)",
              }}
              onClick={() => setShowHolidayCelebration(false)}
            >
              <div
                style={{
                  width: "min(100%, 420px)",
                  borderRadius: "28px",
                  padding: "28px 24px",
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,248,233,0.98) 100%)",
                  border: `1px solid ${monthMeta.accent}33`,
                  boxShadow: "0 30px 60px rgba(0, 0, 0, 0.22)",
                  textAlign: "center",
                }}
                onClick={(event) => event.stopPropagation()}
              >
                <div
                  style={{
                    display: "inline-flex",
                    padding: "8px 14px",
                    borderRadius: "999px",
                    background: `${monthMeta.accent}18`,
                    color: monthMeta.accent,
                    fontSize: "11px",
                    fontWeight: 800,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  Holiday
                </div>
                <h3
                  style={{
                    margin: "16px 0 10px",
                    fontSize: "2rem",
                    color: "#2f2418",
                  }}
                >
                  Today's Holiday
                </h3>
                <p
                  style={{
                    margin: "0 0 8px",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#47372a",
                  }}
                >
                  {activeHoliday.label}
                </p>
                <p
                  style={{
                    margin: 0,
                    color: "#6c5c4a",
                    lineHeight: 1.6,
                  }}
                >
                  {selectedDateLabel} is marked as a holiday. Enjoy the moment.
                </p>
                <button
                  style={{
                    marginTop: "20px",
                    border: "none",
                    borderRadius: "999px",
                    background: monthMeta.accent,
                    color: "#ffffff",
                    padding: "12px 18px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                  onClick={() => setShowHolidayCelebration(false)}
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        ) : null
      }
    />
  );
};

export default CalendarPage;
