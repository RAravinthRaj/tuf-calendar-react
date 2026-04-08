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
import { CalendarNote, CalendarTask } from "../../services";
import * as S from "./styles";

export interface IEntryPanel {
  activeTab: CalendarTabKey;
  addMode: CalendarAddOptionKey;
  notes: CalendarNote[];
  tasks: CalendarTask[];
  draft: string;
  accentColor: string;
  addOptions: Array<{ key: CalendarAddOptionKey; label: string }>;
  errorMessage: string | null;
  editingLabel: string | null;
  onDraftChange: (value: string) => void;
  onAddModePress: (mode: CalendarAddOptionKey) => void;
  onSave: () => void;
  onCancelEdit: () => void;
  onToggleTask: (taskId: string) => void;
  onEditNote: (noteId: string, content: string) => void;
  onDeleteNote: (noteId: string) => void;
  onEditTask: (taskId: string, title: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export const EntryPanel = ({
  activeTab,
  addMode,
  notes,
  tasks,
  draft,
  accentColor,
  addOptions,
  errorMessage,
  editingLabel,
  onDraftChange,
  onAddModePress,
  onSave,
  onCancelEdit,
  onToggleTask,
  onEditNote,
  onDeleteNote,
  onEditTask,
  onDeleteTask,
}: IEntryPanel) => {
  const renderNotes = () => {
    if (notes.length === 0) {
      return <S.EmptyState>No notes</S.EmptyState>;
    }

    return (
      <S.EntryList>
        {notes.map((note) => (
          <S.EntryCard key={note.id}>
            <S.EntryHeader>
              <S.EntryText>{note.content}</S.EntryText>
              <S.EntryActions>
                <S.ActionButton onClick={() => onEditNote(note.id, note.content)}>
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
      <>
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
        {editingLabel ? <S.EntryMeta>{editingLabel}</S.EntryMeta> : null}
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
      </>
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
