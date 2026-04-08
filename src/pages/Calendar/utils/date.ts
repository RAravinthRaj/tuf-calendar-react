/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
export interface CalendarDayItem {
  date: Date;
  dateKey: string;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday: boolean;
}

export const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const formatMonthKey = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");

  return `${year}-${month}`;
};

export const getDateFromKey = (dateKey: string) => {
  const [year, month, day] = dateKey.split("-").map(Number);

  return new Date(year, (month ?? 1) - 1, day ?? 1);
};

export const getMonthDateFromKey = (monthKey: string) => {
  const [year, month] = monthKey.split("-").map(Number);

  return new Date(year, (month ?? 1) - 1, 1);
};

export const isSameDate = (left: Date, right: Date) =>
  left.getFullYear() === right.getFullYear() &&
  left.getMonth() === right.getMonth() &&
  left.getDate() === right.getDate();

export const getCalendarDays = (
  visibleMonthKey: string,
  selectedDateKey: string,
) => {
  const visibleMonthDate = getMonthDateFromKey(visibleMonthKey);
  const monthStart = new Date(
    visibleMonthDate.getFullYear(),
    visibleMonthDate.getMonth(),
    1,
  );
  const gridStart = new Date(monthStart);
  const today = new Date();

  gridStart.setDate(monthStart.getDate() - monthStart.getDay());

  return Array.from({ length: 42 }, (_, index): CalendarDayItem => {
    const date = new Date(gridStart);
    date.setDate(gridStart.getDate() + index);
    const dateKey = formatDateKey(date);

    return {
      date,
      dateKey,
      isCurrentMonth: date.getMonth() === visibleMonthDate.getMonth(),
      isSelected: dateKey === selectedDateKey,
      isToday: isSameDate(date, today),
    };
  });
};

export const getNextMonthSelectedDate = (
  selectedDateKey: string,
  offset: number,
) => {
  const [year, month, day] = selectedDateKey.split("-").map(Number);
  const targetYear = year ?? new Date().getFullYear();
  const targetMonthIndex = (month ?? 1) - 1 + offset;
  const lastDayOfTargetMonth = new Date(
    targetYear,
    targetMonthIndex + 1,
    0,
  ).getDate();

  return new Date(
    targetYear,
    targetMonthIndex,
    Math.min(day ?? 1, lastDayOfTargetMonth),
  );
};
