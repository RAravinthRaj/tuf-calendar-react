/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import {
  CalendarAddOptionKey,
  CalendarTabKey,
} from "../../config";
import {
  CalendarAttachedNote,
  CalendarNote,
  CalendarNoteScope,
  CalendarTask,
} from "../../services";
import * as S from "./styles";

export interface IEntryPanel {
  activeTab: CalendarTabKey;
  addMode: CalendarAddOptionKey;
  notes: CalendarNote[];
  selectedDayAttachedNotes: CalendarAttachedNote[];
  tasks: CalendarTask[];
  attachedNotes: CalendarAttachedNote[];
  draft: string;
  attachedNoteDraft: string;
  attachedNoteScope: CalendarNoteScope;
  accentColor: string;
  addOptions: Array<{ key: CalendarAddOptionKey; label: string }>;
  errorMessage: string | null;
  editingLabel: string | null;
  attachedNoteError: string | null;
  attachedNoteEditingLabel: string | null;
  monthLabel: string;
  selectedDateLabel: string;
  selectedRangeLabel: string | null;
  hasActiveRange: boolean;
  addTargetLabel: string;
  holidayDraft: string;
  holidayLabel: string | null;
  holidayError: string | null;
  onDraftChange: (value: string) => void;
  onAttachedNoteDraftChange: (value: string) => void;
  onAttachedNoteScopeChange: (scope: CalendarNoteScope) => void;
  onHolidayDraftChange: (value: string) => void;
  onAddModePress: (mode: CalendarAddOptionKey) => void;
  onSave: () => void;
  onCancelEdit: () => void;
  onSaveAttachedNote: () => void;
  onCancelAttachedNoteEdit: () => void;
  onSaveHoliday: () => void;
  onDeleteHoliday: () => void;
  onToggleTask: (taskId: string) => void;
  onEditNote: (noteId: string, content: string) => void;
  onDeleteNote: (noteId: string) => void;
  onEditAttachedNote: (note: CalendarAttachedNote) => void;
  onDeleteAttachedNote: (noteId: string) => void;
  onEditTask: (taskId: string, title: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const EntryPanel = ({
  activeTab,
  addMode,
  notes,
  selectedDayAttachedNotes,
  tasks,
  attachedNotes,
  draft,
  attachedNoteDraft,
  attachedNoteScope,
  accentColor,
  addOptions,
  errorMessage,
  editingLabel,
  attachedNoteError,
  attachedNoteEditingLabel,
  monthLabel,
  selectedDateLabel,
  selectedRangeLabel,
  hasActiveRange,
  addTargetLabel,
  holidayDraft,
  holidayLabel,
  holidayError,
  onDraftChange,
  onAttachedNoteDraftChange,
  onAttachedNoteScopeChange,
  onHolidayDraftChange,
  onAddModePress,
  onSave,
  onCancelEdit,
  onSaveAttachedNote,
  onCancelAttachedNoteEdit,
  onSaveHoliday,
  onDeleteHoliday,
  onToggleTask,
  onEditNote,
  onDeleteNote,
  onEditAttachedNote,
  onDeleteAttachedNote,
  onEditTask,
  onDeleteTask,
}: IEntryPanel) => {
  const attachedScopeLabel =
    attachedNoteScope === "month"
      ? monthLabel
      : attachedNoteScope === "range"
        ? selectedRangeLabel ?? "Select a date range on the calendar"
        : selectedDateLabel;
  const dayAttachedNotes = selectedDayAttachedNotes.filter(
    (note) => note.scope === "date" || note.scope === "month",
  );
  const rangeAttachedNotes = selectedDayAttachedNotes.filter(
    (note) => note.scope === "range",
  );

  const renderNotes = () => {
    return (
      <S.NotesLayout>
        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitle>Selected Day Notes</S.SectionTitle>
            <S.SectionCaption>{selectedDateLabel}</S.SectionCaption>
          </S.SectionHeader>
          {notes.length === 0 ? (
            dayAttachedNotes.length === 0 ? (
              <S.EmptyState>No notes for this day yet.</S.EmptyState>
            ) : null
          ) : (
            <S.EntryList>
              {notes.map((note) => (
                <S.EntryCard key={note.id}>
                  <S.EntryHeader>
                    <S.EntryText>{note.content}</S.EntryText>
                    <S.EntryActions>
                      <S.ActionButton
                        onClick={() => onEditNote(note.id, note.content)}
                      >
                        Edit
                      </S.ActionButton>
                      <S.ActionButton onClick={() => onDeleteNote(note.id)}>
                        Delete
                      </S.ActionButton>
                    </S.EntryActions>
                  </S.EntryHeader>
                  <S.EntryMeta>
                    {new Date(note.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </S.EntryMeta>
                </S.EntryCard>
              ))}
            </S.EntryList>
          )}
          {dayAttachedNotes.length > 0 ? (
            <S.EntryList>
              {dayAttachedNotes.map((note) => (
                <S.EntryCard key={note.id}>
                  <S.EntryHeader>
                    <div>
                      <S.EntryText>{note.content}</S.EntryText>
                      <S.EntryMeta>
                        {note.scope === "range"
                          ? `Range note: ${note.startDateKey} to ${note.endDateKey}`
                          : note.scope === "month"
                            ? `Month memo for ${monthLabel}`
                            : "Selected date note"}
                      </S.EntryMeta>
                    </div>
                    <S.EntryActions>
                      <S.ActionButton onClick={() => onEditAttachedNote(note)}>
                        Edit
                      </S.ActionButton>
                      <S.ActionButton onClick={() => onDeleteAttachedNote(note.id)}>
                        Delete
                      </S.ActionButton>
                    </S.EntryActions>
                  </S.EntryHeader>
                  <S.EntryMeta>
                    {new Date(note.createdAt).toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </S.EntryMeta>
                </S.EntryCard>
              ))}
            </S.EntryList>
          ) : null}
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitle>Range Notes</S.SectionTitle>
            <S.SectionCaption>
              {selectedRangeLabel ?? "Notes linked to selected ranges"}
            </S.SectionCaption>
          </S.SectionHeader>
          {rangeAttachedNotes.length === 0 ? (
            <S.EmptyState>No range notes for this day.</S.EmptyState>
          ) : (
            <S.EntryList>
              {rangeAttachedNotes.map((note) => (
                <S.EntryCard key={note.id}>
                  <S.EntryHeader>
                    <div>
                      <S.EntryText>{note.content}</S.EntryText>
                      <S.EntryMeta>
                        Range note: {note.startDateKey} to {note.endDateKey}
                      </S.EntryMeta>
                    </div>
                    <S.EntryActions>
                      <S.ActionButton onClick={() => onEditAttachedNote(note)}>
                        Edit
                      </S.ActionButton>
                      <S.ActionButton onClick={() => onDeleteAttachedNote(note.id)}>
                        Delete
                      </S.ActionButton>
                    </S.EntryActions>
                  </S.EntryHeader>
                  <S.EntryMeta>
                    {new Date(note.createdAt).toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </S.EntryMeta>
                </S.EntryCard>
              ))}
            </S.EntryList>
          )}
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitle>Holiday Marker</S.SectionTitle>
            <S.SectionCaption>{selectedDateLabel}</S.SectionCaption>
          </S.SectionHeader>
          <S.TextInput
            value={holidayDraft}
            onChange={(event) => onHolidayDraftChange(event.target.value)}
            placeholder="Example: Founders' Day"
          />
          {holidayLabel ? (
            <S.HintCard>Marked as holiday: {holidayLabel}</S.HintCard>
          ) : (
            <S.HintCard>
              Pick a date and give it a holiday label to show a popup and confetti
              when that day is opened.
            </S.HintCard>
          )}
          {holidayError ? <S.ErrorText>{holidayError}</S.ErrorText> : null}
          <S.FooterRow>
            <S.SaveButton $accentColor={accentColor} onClick={onSaveHoliday}>
              {holidayLabel ? "Update Holiday" : "Save Holiday"}
            </S.SaveButton>
            {holidayLabel ? (
              <S.SecondaryButton onClick={onDeleteHoliday}>
                Remove Holiday
              </S.SecondaryButton>
            ) : null}
          </S.FooterRow>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitle>Integrated Notes</S.SectionTitle>
            <S.SectionCaption>{attachedScopeLabel}</S.SectionCaption>
          </S.SectionHeader>
          <S.ScopeRow>
            {([
              { key: "month", label: "Month Memo" },
              { key: "date", label: "Selected Date" },
              { key: "range", label: "Selected Range" },
            ] as Array<{ key: CalendarNoteScope; label: string }>).map((option) => (
              <S.ScopeButton
                key={option.key}
                $active={attachedNoteScope === option.key}
                $accentColor={accentColor}
                onClick={() => onAttachedNoteScopeChange(option.key)}
              >
                {option.label}
              </S.ScopeButton>
            ))}
          </S.ScopeRow>
          {attachedNoteScope === "range" && !hasActiveRange ? (
            <S.HintCard>
              Select a start date and an end date on the grid to attach a note
              to a range.
            </S.HintCard>
          ) : null}
          <S.TextArea
            value={attachedNoteDraft}
            onChange={(event) => onAttachedNoteDraftChange(event.target.value)}
            placeholder={`Write a note for ${attachedScopeLabel}`}
          />
          {attachedNoteEditingLabel ? (
            <S.EntryMeta>{attachedNoteEditingLabel}</S.EntryMeta>
          ) : null}
          {attachedNoteError ? <S.ErrorText>{attachedNoteError}</S.ErrorText> : null}
          <S.FooterRow>
            <S.SaveButton $accentColor={accentColor} onClick={onSaveAttachedNote}>
              {attachedNoteEditingLabel ? "Update Note" : "Save Note"}
            </S.SaveButton>
            {attachedNoteEditingLabel ? (
              <S.SecondaryButton onClick={onCancelAttachedNoteEdit}>
                Cancel
              </S.SecondaryButton>
            ) : null}
          </S.FooterRow>

          {attachedNotes.length === 0 ? (
            <S.EmptyState>No attached notes in this section yet.</S.EmptyState>
          ) : (
            <S.EntryList>
              {attachedNotes.map((note) => (
                <S.EntryCard key={note.id}>
                  <S.EntryHeader>
                    <S.EntryText>{note.content}</S.EntryText>
                    <S.EntryActions>
                      <S.ActionButton onClick={() => onEditAttachedNote(note)}>
                        Edit
                      </S.ActionButton>
                      <S.ActionButton onClick={() => onDeleteAttachedNote(note.id)}>
                        Delete
                      </S.ActionButton>
                    </S.EntryActions>
                  </S.EntryHeader>
                  <S.EntryMeta>
                    {new Date(note.createdAt).toLocaleString([], {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </S.EntryMeta>
                </S.EntryCard>
              ))}
            </S.EntryList>
          )}
        </S.SectionCard>
      </S.NotesLayout>
    );
  };

  const renderTasks = () => {
    if (tasks.length === 0) {
      return <S.EmptyState>No tasks</S.EmptyState>;
    }

    return (
      <S.EntryList>
        {tasks.map((task) => (
          <S.EntryCard key={task.id}>
            <S.EntryHeader>
              <S.TaskRow>
              <S.Checkbox
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
              />
              <div>
                <S.TaskText $completed={task.completed}>{task.title}</S.TaskText>
                <S.EntryMeta>
                  {new Date(task.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </S.EntryMeta>
              </div>
              </S.TaskRow>
              <S.EntryActions>
                <S.ActionButton onClick={() => onEditTask(task.id, task.title)}>
                  Edit
                </S.ActionButton>
                <S.ActionButton onClick={() => onDeleteTask(task.id)}>
                  Delete
                </S.ActionButton>
              </S.EntryActions>
            </S.EntryHeader>
          </S.EntryCard>
        ))}
      </S.EntryList>
    );
  };

  const renderAdd = () => {
    return (
      <S.NotesLayout>
        <S.TargetGrid>
          <S.SectionCard>
            <S.SectionHeader>
              <S.SectionTitle>Particular Date</S.SectionTitle>
              <S.SectionCaption>{selectedDateLabel}</S.SectionCaption>
            </S.SectionHeader>
            <S.HintCard>
              Add a {addMode === "note" ? "note" : "task"} only for the selected
              day.
            </S.HintCard>
          </S.SectionCard>
          <S.SectionCard>
            <S.SectionHeader>
              <S.SectionTitle>Selected Range</S.SectionTitle>
              <S.SectionCaption>
                {selectedRangeLabel ?? "Select a range on the calendar"}
              </S.SectionCaption>
            </S.SectionHeader>
            <S.HintCard>
              {hasActiveRange
                ? `Add across the selected range when the range is complete.`
                : "Choose a start date and end date to add across multiple days."}
            </S.HintCard>
          </S.SectionCard>
        </S.TargetGrid>

        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitle>Task / Note Composer</S.SectionTitle>
            <S.SectionCaption>{editingLabel ?? addTargetLabel}</S.SectionCaption>
          </S.SectionHeader>
          <S.SegmentRow>
            {addOptions.map((option) => (
              <S.SegmentButton
                key={option.key}
                $active={addMode === option.key}
                $accentColor={accentColor}
                onClick={() => onAddModePress(option.key)}
              >
                {option.label}
              </S.SegmentButton>
            ))}
          </S.SegmentRow>
          <S.TextArea
            value={draft}
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder={addMode === "note" ? "Write note" : "Write task"}
          />
          <S.HintCard>{addTargetLabel}</S.HintCard>
          {errorMessage ? <S.ErrorText>{errorMessage}</S.ErrorText> : null}
          <S.FooterRow>
            <S.SaveButton $accentColor={accentColor} onClick={onSave}>
              {editingLabel
                ? addMode === "note"
                  ? "Update Note"
                  : "Update Task"
                : addMode === "note"
                  ? "Add Note"
                  : "Add Task"}
            </S.SaveButton>
            {editingLabel ? (
              <S.SecondaryButton onClick={onCancelEdit}>Cancel</S.SecondaryButton>
            ) : null}
          </S.FooterRow>
        </S.SectionCard>
      </S.NotesLayout>
    );
  };

  return (
    <S.Panel>
      {activeTab === "notes" ? renderNotes() : null}
      {activeTab === "tasks" ? renderTasks() : null}
      {activeTab === "add" ? renderAdd() : null}
    </S.Panel>
  );
};
