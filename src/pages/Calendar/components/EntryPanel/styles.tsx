/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import styled from "styled-components";

export const Panel = styled.div`
  min-height: 420px;
  border-radius: 24px;
  border: 1px solid var(--surface-border);
  background: var(--surface);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const NotesLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const SectionCard = styled.section`
  border-radius: 20px;
  border: 1px solid var(--surface-border);
  background: var(--surface-card);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const SectionTitle = styled.h3`
  margin: 0;
  color: var(--text-strong);
  font-size: 15px;
`;

export const SectionCaption = styled.div`
  color: var(--text-soft);
  font-size: 12px;
  text-align: right;
`;

export const SegmentRow = styled.div`
  display: flex;
  gap: 8px;
`;

export const SegmentButton = styled.button<{
  $active: boolean;
  $accentColor: string;
}>`
  flex: 1;
  border-radius: 999px;
  border: 1px solid
    ${({ $active, $accentColor }) => ($active ? $accentColor : "#ddcdb7")};
  background: ${({ $active, $accentColor }) => ($active ? `${$accentColor}20` : "var(--control-bg)")};
  color: var(--panel-text);
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

export const EmptyState = styled.div`
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 1px dashed var(--surface-border);
  border-radius: 20px;
  color: var(--muted);
  font-size: 14px;
`;

export const HintCard = styled.div`
  border-radius: 16px;
  border: 1px dashed var(--surface-border);
  background: var(--surface);
  padding: 12px 14px;
  color: var(--text-soft);
  font-size: 13px;
  line-height: 1.5;
`;

export const EntryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const EntryCard = styled.div`
  border-radius: 18px;
  border: 1px solid #e1d2be;
  background: var(--surface-card);
  padding: 14px;
`;

export const EntryText = styled.div`
  color: var(--text-strong);
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.5;
`;

export const EntryMeta = styled.div`
  margin-top: 8px;
  font-size: 12px;
  color: var(--text-soft);
`;

export const TaskRow = styled.label`
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 10px;
  align-items: start;
  cursor: pointer;
`;

export const Checkbox = styled.input`
  margin-top: 2px;
  accent-color: #2f84c8;
`;

export const TaskText = styled.div<{ $completed: boolean }>`
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
  opacity: ${({ $completed }) => ($completed ? 0.58 : 1)};
  line-height: 1.45;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 160px;
  resize: vertical;
  border: 1px solid var(--surface-border);
  border-radius: 20px;
  outline: none;
  padding: 14px;
  background: var(--surface-card);
  color: var(--text-strong);
  font: inherit;
  line-height: 1.5;
`;

export const TextInput = styled.input`
  width: 100%;
  min-height: 48px;
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  outline: none;
  padding: 0 14px;
  background: var(--surface);
  color: var(--text-strong);
  font: inherit;
`;

export const ScopeRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ScopeButton = styled.button<{
  $active: boolean;
  $accentColor: string;
}>`
  border-radius: 999px;
  border: 1px solid
    ${({ $active, $accentColor }) => ($active ? $accentColor : "#ddcdb7")};
  background: ${({ $active, $accentColor }) =>
    $active ? `${$accentColor}20` : "var(--control-bg)"};
  color: var(--panel-text);
  padding: 9px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
`;

export const SaveButton = styled.button<{ $accentColor: string }>`
  align-self: flex-start;
  border: none;
  border-radius: 999px;
  background: ${({ $accentColor }) => $accentColor};
  color: #ffffff;
  padding: 12px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

export const ErrorText = styled.div`
  color: #b14646;
  font-size: 13px;
`;

export const EntryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
`;

export const EntryActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
`;

export const ActionButton = styled.button`
  border: 1px solid var(--control-border);
  background: var(--control-bg);
  color: var(--panel-text);
  border-radius: 999px;
  padding: 7px 10px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
`;

export const FooterRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const SecondaryButton = styled.button`
  align-self: flex-start;
  border: 1px solid var(--control-border);
  border-radius: 999px;
  background: var(--control-bg);
  color: var(--panel-text);
  padding: 12px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
