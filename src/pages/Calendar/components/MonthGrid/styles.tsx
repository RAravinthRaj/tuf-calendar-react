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
  grid-template-columns: minmax(180px, 228px) minmax(0, 1fr);
  gap: 22px;
  margin-top: 10px;
  min-height: 0;
  align-items: stretch;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const TodayRail = styled.div<{ $accentColor: string }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  border-radius: 28px;
  padding: 18px 16px 16px;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.08);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: auto -20px -42px auto;
    width: 120px;
    height: 120px;
    border-radius: 28px;
    background: ${({ $accentColor }) => `${$accentColor}1c`};
    transform: rotate(18deg);
    pointer-events: none;
  }

  @media (max-width: 920px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 14px 18px;
    align-items: start;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    border-radius: 22px;
    padding: 16px;
  }
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
`;

export const TodayList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 0;

  @media (max-width: 920px) {
    min-height: 0;
  }
`;

export const TodayEmpty = styled.div`
  color: var(--muted);
  line-height: 1.5;
  font-size: 14px;
`;

export const TodayItem = styled.div<{ $completed: boolean }>`
  position: relative;
  padding: 10px 10px 10px 26px;
  border-radius: 18px;
  background: var(--control-bg);
  color: var(--text-strong);
  font-size: 13px;
  line-height: 1.4;
  text-decoration: ${({ $completed }) =>
    $completed ? "line-through" : "none"};
  opacity: ${({ $completed }) => ($completed ? 0.58 : 1)};
`;

export const TodayPin = styled.span<{ $accentColor: string }>`
  position: absolute;
  left: 12px;
  top: 14px;
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
  min-height: 42px;
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

  @media (max-width: 920px) {
    margin-top: 0;
    align-self: start;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const CalendarSection = styled.div<{ $direction: "next" | "prev" }>`
  position: relative;
  min-height: 0;
  padding: 20px 20px 18px;
  border-radius: 30px 30px 24px 24px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.68), rgba(255, 248, 238, 0.9)),
    var(--surface-card);
  border: 1px solid var(--surface-border);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.5),
    0 18px 34px rgba(85, 62, 31, 0.08);
  display: flex;
  flex-direction: column;
  animation: ${({ $direction }) =>
    $direction === "next"
      ? css`
          ${flipSlideNext} 520ms cubic-bezier(0.22, 1, 0.36, 1)
        `
      : css`
          ${flipSlidePrev} 520ms cubic-bezier(0.22, 1, 0.36, 1)
        `};

  @media (max-width: 768px) {
    padding: 18px 14px 16px;
    border-radius: 24px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 26px;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 20px;
  }
`;

export const Title = styled.h3`
  margin: 0;
  font-size: clamp(1.6rem, 3vw, 2.15rem);
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--calendar-title);
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ClearRangeButton = styled.button`
  border: 1px solid var(--control-border);
  background: var(--control-bg);
  color: var(--panel-text);
  border-radius: 999px;
  padding: 7px 11px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(92, 67, 37, 0.05);
`;

export const NavRail = styled.div`
  display: flex;
  align-items: center;
  background: var(--control-bg);
  border: 1px solid var(--control-border);
  border-radius: 999px;
  padding: 3px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.07);
`;

export const NavButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: var(--calendar-title);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 16px;
  }
`;

export const NavDivider = styled.div`
  width: 1px;
  height: 18px;
  background: var(--control-border);
`;

export const Weekdays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 22px;

  @media (max-width: 640px) {
    gap: 6px;
    margin-bottom: 16px;
  }
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
  gap: 9px;
  flex: 1;
  align-content: start;

  @media (max-width: 920px) {
    gap: 8px;
  }

  @media (max-width: 768px) {
    gap: 8px;
  }

  @media (max-width: 560px) {
    gap: 6px;
  }
`;

export const DateCell = styled.button<{
  $isSelected: boolean;
  $isCurrentMonth: boolean;
  $isToday: boolean;
  $isRangeStart: boolean;
  $isRangeEnd: boolean;
  $isInRange: boolean;
  $accentColor: string;
}>`
  position: relative;
  min-height: clamp(46px, 5.5vh, 64px);
  padding: 8px 5px;
  border: 1px solid
    ${({ $isSelected, $isToday, $isRangeStart, $isRangeEnd, $isInRange, $accentColor }) =>
      $isSelected || $isRangeStart || $isRangeEnd
        ? `${$accentColor}ee`
        : $isInRange
          ? `${$accentColor}66`
          : $isToday
            ? "#c9a473"
            : "transparent"};
  background: ${({ $isSelected, $isRangeStart, $isRangeEnd, $isInRange, $accentColor }) =>
    $isSelected
      ? $accentColor
      : $isRangeStart || $isRangeEnd
        ? `${$accentColor}d8`
        : $isInRange
          ? `${$accentColor}1f`
          : "transparent"};
  color: ${({ $isSelected, $isRangeStart, $isRangeEnd, $isCurrentMonth }) =>
    $isSelected || $isRangeStart || $isRangeEnd
      ? "#ffffff"
      : $isCurrentMonth
        ? "var(--text-strong)"
        : "#8d8d8d"};
  border-radius: ${({ $isRangeStart, $isRangeEnd, $isInRange }) =>
    $isInRange && !$isRangeStart && !$isRangeEnd ? "8px" : "12px"};
  text-align: center;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
  box-shadow: ${({ $isSelected, $isRangeStart, $isRangeEnd }) =>
    $isSelected || $isRangeStart || $isRangeEnd
      ? "0 10px 20px rgba(0, 0, 0, 0.1)"
      : "none"};
  backdrop-filter: blur(1px);

  &:hover {
    transform: translateY(-2px) rotate(-1deg);
  }

  @media (max-width: 768px) {
    min-height: 52px;
    padding: 8px 4px;
    border-radius: 10px;
  }

  @media (max-width: 560px) {
    min-height: 48px;
    padding: 7px 3px;
    border-radius: 8px;
  }
`;

export const DateNumber = styled.div`
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.1;

  @media (max-width: 560px) {
    font-size: 0.84rem;
  }
`;

export const TodayMarker = styled.span<{ $isSelected: boolean }>`
  position: absolute;
  top: 7px;
  right: 7px;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${({ $isSelected }) => ($isSelected ? "#ffffff" : "#c9a473")};
  box-shadow: 0 0 0 3px rgba(201, 164, 115, 0.18);

  @media (max-width: 768px) {
    top: 5px;
    right: 5px;
    width: 6px;
    height: 6px;
  }
`;

export const HolidayMarker = styled.span<{ $isSelected: boolean }>`
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: ${({ $isSelected }) =>
    $isSelected ? "rgba(255, 255, 255, 0.22)" : "#f4d792"};
  color: ${({ $isSelected }) => ($isSelected ? "#ffffff" : "#7b4d00")};
  padding: 2px 6px;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 8px;
    bottom: 5px;
    padding: 1px 4px;
  }

  @media (max-width: 560px) {
    display: none;
  }
`;

export const CountLabel = styled.div`
  margin-top: 6px;
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
