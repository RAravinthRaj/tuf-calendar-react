/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import styled from "styled-components";
import { css, keyframes } from "styled-components";

const flipSlideNext = keyframes`
  from {
    opacity: 0.5;
    transform: perspective(1200px) rotateY(-10deg) translateX(18px);
    transform-origin: left center;
  }

  to {
    opacity: 1;
    transform: perspective(1200px) rotateY(0deg) translateX(0);
    transform-origin: left center;
  }
`;

const flipSlidePrev = keyframes`
  from {
    opacity: 0.5;
    transform: perspective(1200px) rotateY(10deg) translateX(-18px);
    transform-origin: right center;
  }

  to {
    opacity: 1;
    transform: perspective(1200px) rotateY(0deg) translateX(0);
    transform-origin: right center;
  }
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(160px, 220px) 1fr;
  gap: 28px;
  margin-top: 20px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const TodayRail = styled.div<{ $accentColor: string }>`
  padding-top: 26px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-self: stretch;
  position: relative;
  background:
    linear-gradient(
      180deg,
      ${({ $accentColor }) => `${$accentColor}16`} 0%,
      transparent 100%
    ),
    var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 24px;
  padding: 18px 16px 16px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
`;

export const TodayHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const TodayHeadActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TodayLabel = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--weekday);
`;

export const TodayBadge = styled.div`
  min-width: 34px;
  height: 34px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--control-bg);
  border: 1px solid var(--control-border);
  color: var(--panel-text);
  font-weight: 700;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.04);
`;

export const TodayAddButton = styled.button<{ $accentColor: string }>`
  display: none;
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: none;
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.28), transparent 45%),
    ${({ $accentColor }) => $accentColor};
  color: #ffffff;
  align-items: center;
  justify-content: center;
  font-size: 1.45rem;
  line-height: 1;
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.16);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 24px rgba(0, 0, 0, 0.18);
  }

  @media (max-width: 680px) {
    display: flex;
    width: 38px;
    height: 38px;
    font-size: 1.55rem;
  }
`;

export const TodayList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 190px;
`;

export const TodayEmpty = styled.div`
  color: var(--muted);
  line-height: 1.5;
  font-size: 14px;
`;

export const TodayItem = styled.div<{ $completed: boolean }>`
  position: relative;
  padding: 12px 12px 12px 28px;
  border-radius: 18px;
  background: var(--control-bg);
  color: var(--text-strong);
  font-size: 14px;
  line-height: 1.45;
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
  opacity: ${({ $completed }) => ($completed ? 0.58 : 1)};
`;

export const TodayPin = styled.span<{ $accentColor: string }>`
  position: absolute;
  left: 12px;
  top: 16px;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${({ $accentColor }) => $accentColor};
`;

export const TodayAction = styled.button<{ $accentColor: string }>`
  margin-top: auto;
  border: none;
  border-radius: 999px;
  background: ${({ $accentColor }) => $accentColor};
  color: #ffffff;
  min-height: 44px;
  padding: 0 16px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 30px rgba(0, 0, 0, 0.18);
  }
`;

export const CalendarSection = styled.div<{ $direction: "next" | "prev" }>`
  animation: ${({ $direction }) =>
    $direction === "next"
      ? css`
          ${flipSlideNext} 520ms cubic-bezier(0.22, 1, 0.36, 1)
        `
      : css`
          ${flipSlidePrev} 520ms cubic-bezier(0.22, 1, 0.36, 1)
        `};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 22px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: clamp(1.6rem, 3vw, 2.15rem);
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--calendar-title);
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
`;

export const NavRail = styled.div`
  display: flex;
  align-items: center;
  background: var(--control-bg);
  border: 1px solid var(--control-border);
  border-radius: 999px;
  padding: 6px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
`;

export const NavButton = styled.button`
  width: 52px;
  height: 52px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: var(--calendar-title);
  font-size: 28px;
  line-height: 1;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 42px;
    height: 42px;
    font-size: 22px;
  }
`;

export const NavDivider = styled.div`
  width: 1px;
  height: 28px;
  background: var(--control-border);
`;

export const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 16px;
`;

export const Weekday = styled.div<{ $isWeekend: boolean }>`
  text-align: center;
  color: ${({ $isWeekend }) => ($isWeekend ? "#2294da" : "#655747")};
  color: ${({ $isWeekend }) =>
    $isWeekend ? "var(--weekend)" : "var(--weekday)"};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

export const DateCell = styled.button<{
  $isSelected: boolean;
  $isCurrentMonth: boolean;
  $isToday: boolean;
  $accentColor: string;
}>`
  min-height: 72px;
  padding: 10px 6px;
  border: 1px solid
    ${({ $isSelected, $isToday, $accentColor }) =>
      $isSelected ? $accentColor : $isToday ? "#c9a473" : "transparent"};
  background: ${({ $isSelected, $accentColor }) =>
    $isSelected ? $accentColor : "transparent"};
  color: ${({ $isSelected, $isCurrentMonth }) =>
    $isSelected ? "#fff" : $isCurrentMonth ? "var(--text-strong)" : "#8d8d8d"};
  border-radius: 18px;
  text-align: center;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: ${({ $isSelected }) =>
    $isSelected ? "0 12px 24px rgba(0, 0, 0, 0.12)" : "none"};

  &:hover {
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    min-height: 48px;
    padding: 6px 4px;
    border-radius: 12px;
  }
`;

export const DateNumber = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.1;
`;

export const CountLabel = styled.div`
  margin-top: 8px;
  min-height: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Dot = styled.span<{ $accentColor: string; $isSelected: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: ${({ $isSelected, $accentColor }) =>
    $isSelected ? "#ffffff" : $accentColor};
  display: block;

  @media (max-width: 768px) {
    width: 6px;
    height: 6px;
  }
`;
