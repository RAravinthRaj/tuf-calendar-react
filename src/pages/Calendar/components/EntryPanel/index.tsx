/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import {
  CALENDAR_CONFIG,
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
  const { entryPanel } = CALENDAR_CONFIG.content;
  const attachedScopeLabel =
    attachedNoteScope === "month"
      ? monthLabel
      : attachedNoteScope === "range"
        ? selectedRangeLabel ?? entryPanel.attachedScopeFallback
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
            <S.SectionTitle>{entryPanel.sections.selectedDayNotes}</S.SectionTitle>
            <S.SectionCaption>{selectedDateLabel}</S.SectionCaption>
          </S.SectionHeader>
          {notes.length === 0 ? (
            dayAttachedNotes.length === 0 ? (
              <S.EmptyState>{entryPanel.emptyStates.noDayNotes}</S.EmptyState>
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
                          ? `${entryPanel.noteMeta.rangePrefix} ${note.startDateKey} ${entryPanel.noteMeta.rangeConnector} ${note.endDateKey}`
                          : note.scope === "month"
                            ? `${entryPanel.noteMeta.monthMemoPrefix} ${monthLabel}`
                            : entryPanel.noteMeta.selectedDateNote}
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
            <S.SectionTitle>{entryPanel.sections.rangeNotes}</S.SectionTitle>
            <S.SectionCaption>
              {selectedRangeLabel ?? entryPanel.noteMeta.rangeNotesCaptionFallback}
            </S.SectionCaption>
          </S.SectionHeader>
          {rangeAttachedNotes.length === 0 ? (
            <S.EmptyState>{entryPanel.emptyStates.noRangeNotes}</S.EmptyState>
          ) : (
            <S.EntryList>
              {rangeAttachedNotes.map((note) => (
                <S.EntryCard key={note.id}>
                  <S.EntryHeader>
                    <div>
                      <S.EntryText>{note.content}</S.EntryText>
                      <S.EntryMeta>
                        {entryPanel.noteMeta.rangePrefix} {note.startDateKey}{" "}
                        {entryPanel.noteMeta.rangeConnector} {note.endDateKey}
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
            <S.SectionTitle>{entryPanel.sections.holidayMarker}</S.SectionTitle>
            <S.SectionCaption>{selectedDateLabel}</S.SectionCaption>
          </S.SectionHeader>
          <S.TextInput
            value={holidayDraft}
            onChange={(event) => onHolidayDraftChange(event.target.value)}
            placeholder={entryPanel.holiday.inputPlaceholder}
          />
          {holidayLabel ? (
            <S.HintCard>
              {entryPanel.holiday.markedPrefix} {holidayLabel}
            </S.HintCard>
          ) : (
            <S.HintCard>{entryPanel.holiday.hint}</S.HintCard>
          )}
          {holidayError ? <S.ErrorText>{holidayError}</S.ErrorText> : null}
          <S.FooterRow>
            <S.SaveButton $accentColor={accentColor} onClick={onSaveHoliday}>
              {holidayLabel
                ? entryPanel.holiday.updateButton
                : entryPanel.holiday.saveButton}
            </S.SaveButton>
            {holidayLabel ? (
              <S.SecondaryButton onClick={onDeleteHoliday}>
                {entryPanel.holiday.removeButton}
              </S.SecondaryButton>
            ) : null}
          </S.FooterRow>
        </S.SectionCard>

        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitle>{entryPanel.sections.integratedNotes}</S.SectionTitle>
            <S.SectionCaption>{attachedScopeLabel}</S.SectionCaption>
          </S.SectionHeader>
          <S.ScopeRow>
            {(entryPanel.attachedNotes.scopeOptions as ReadonlyArray<{
              key: CalendarNoteScope;
              label: string;
            }>).map((option) => (
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
            <S.HintCard>{entryPanel.attachedNotes.rangeHint}</S.HintCard>
          ) : null}
          <S.TextArea
            value={attachedNoteDraft}
            onChange={(event) => onAttachedNoteDraftChange(event.target.value)}
            placeholder={`${entryPanel.attachedNotes.textAreaPlaceholderPrefix} ${attachedScopeLabel}`}
          />
          {attachedNoteEditingLabel ? (
            <S.EntryMeta>{attachedNoteEditingLabel}</S.EntryMeta>
          ) : null}
          {attachedNoteError ? <S.ErrorText>{attachedNoteError}</S.ErrorText> : null}
          <S.FooterRow>
            <S.SaveButton $accentColor={accentColor} onClick={onSaveAttachedNote}>
              {attachedNoteEditingLabel
                ? entryPanel.attachedNotes.updateButton
                : entryPanel.attachedNotes.saveButton}
            </S.SaveButton>
            {attachedNoteEditingLabel ? (
              <S.SecondaryButton onClick={onCancelAttachedNoteEdit}>
                {entryPanel.attachedNotes.cancelButton}
              </S.SecondaryButton>
            ) : null}
          </S.FooterRow>

          {attachedNotes.length === 0 ? (
            <S.EmptyState>{entryPanel.emptyStates.noAttachedNotes}</S.EmptyState>
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
      return <S.EmptyState>{entryPanel.emptyStates.noTasks}</S.EmptyState>;
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
                  {entryPanel.tasks.editButton}
                </S.ActionButton>
                <S.ActionButton onClick={() => onDeleteTask(task.id)}>
                  {entryPanel.tasks.deleteButton}
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
              <S.SectionTitle>{entryPanel.sections.particularDate}</S.SectionTitle>
              <S.SectionCaption>{selectedDateLabel}</S.SectionCaption>
            </S.SectionHeader>
            <S.HintCard>
              {addMode === "note"
                ? entryPanel.add.particularDateHint.note
                : entryPanel.add.particularDateHint.task}
            </S.HintCard>
          </S.SectionCard>
          <S.SectionCard>
            <S.SectionHeader>
              <S.SectionTitle>{entryPanel.sections.selectedRange}</S.SectionTitle>
              <S.SectionCaption>
                {selectedRangeLabel ?? entryPanel.add.selectedRangeCaptionFallback}
              </S.SectionCaption>
            </S.SectionHeader>
            <S.HintCard>
              {hasActiveRange
                ? entryPanel.add.selectedRangeHintActive
                : entryPanel.add.selectedRangeHintInactive}
            </S.HintCard>
          </S.SectionCard>
        </S.TargetGrid>

        <S.SectionCard>
          <S.SectionHeader>
            <S.SectionTitle>{entryPanel.sections.composer}</S.SectionTitle>
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
            placeholder={
              addMode === "note"
                ? entryPanel.add.notePlaceholder
                : entryPanel.add.taskPlaceholder
            }
          />
          <S.HintCard>{addTargetLabel}</S.HintCard>
          {errorMessage ? <S.ErrorText>{errorMessage}</S.ErrorText> : null}
          <S.FooterRow>
            <S.SaveButton $accentColor={accentColor} onClick={onSave}>
              {editingLabel
                ? addMode === "note"
                  ? entryPanel.add.updateNoteButton
                  : entryPanel.add.updateTaskButton
                : addMode === "note"
                  ? entryPanel.add.addNoteButton
                  : entryPanel.add.addTaskButton}
            </S.SaveButton>
            {editingLabel ? (
              <S.SecondaryButton onClick={onCancelEdit}>
                {entryPanel.add.cancelButton}
              </S.SecondaryButton>
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
