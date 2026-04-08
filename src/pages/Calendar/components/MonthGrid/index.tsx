/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { CALENDAR_CONFIG } from "../../config";
import { CalendarTask } from "../../services";
import { CalendarDayItem } from "../../../../utils/date";
import * as S from "./styles";

export interface IMonthGrid {
  title: string;
  weekdays: string[];
  days: CalendarDayItem[];
  entryCounts: Record<string, number>;
  accentColor: string;
  direction: "next" | "prev";
  todayTasks: CalendarTask[];
  hasActiveRange: boolean;
  holidayCount: number;
  onOpenTask: () => void;
  onAddTodayTask: () => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onClearRange: () => void;
  onSelectDate: (date: Date) => void;
}

export const MonthGrid = ({
  title,
  weekdays,
  days,
  entryCounts,
  accentColor,
  direction,
  todayTasks,
  hasActiveRange,
  holidayCount,
  onOpenTask,
  onAddTodayTask,
  onPreviousMonth,
  onNextMonth,
  onClearRange,
  onSelectDate,
}: IMonthGrid) => {
  const { monthGrid } = CALENDAR_CONFIG.content;

  return (
    <S.Wrapper>
      <S.TodayRail $accentColor={accentColor}>
        <S.TodayHead>
          <S.TodayLabel>{monthGrid.todayTodoLabel}</S.TodayLabel>
          <S.TodayHeadActions>
            <S.TodayBadge>{todayTasks.length}</S.TodayBadge>
            <S.TodayAddButton
              $accentColor={accentColor}
              onClick={onAddTodayTask}
              aria-label={monthGrid.addTaskForTodayAriaLabel}
            >
              +
            </S.TodayAddButton>
          </S.TodayHeadActions>
        </S.TodayHead>
        <S.TodayList>
          {todayTasks.length === 0 ? (
            <S.TodayEmpty>{monthGrid.nothingPlannedForToday}</S.TodayEmpty>
          ) : (
            todayTasks.slice(0, 5).map((task) => (
              <S.TodayItem key={task.id} $completed={task.completed}>
                <S.TodayPin $accentColor={accentColor} />
                <span>{task.title}</span>
              </S.TodayItem>
            ))
          )}
        </S.TodayList>
        <S.TodayAction $accentColor={accentColor} onClick={onOpenTask}>
          {monthGrid.openTodayButton}
        </S.TodayAction>
      </S.TodayRail>

      <S.CalendarSection $direction={direction}>
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.Actions>
            <S.NavRail>
              <S.NavButton
                onClick={onPreviousMonth}
                aria-label={monthGrid.previousMonthAriaLabel}
              >
                &#8249;
              </S.NavButton>
              <S.NavDivider />
              <S.NavButton
                onClick={onNextMonth}
                aria-label={monthGrid.nextMonthAriaLabel}
              >
                &#8250;
              </S.NavButton>
            </S.NavRail>
          </S.Actions>
        </S.Header>

        <S.Weekdays>
          {weekdays.map((day, index) => (
            <S.Weekday key={day} $isWeekend={index === 0 || index === 6}>
              {day}
            </S.Weekday>
          ))}
        </S.Weekdays>

        <S.RangeToolbar>
          <S.RangeLegend>
            <S.RangeLegendItem>
              <S.RangeLegendSwatch
                $accentColor={accentColor}
                $variant="start"
              />
              {monthGrid.rangeLegend.start}
            </S.RangeLegendItem>
            <S.RangeLegendItem>
              <S.RangeLegendSwatch $accentColor={accentColor} $variant="end" />
              {monthGrid.rangeLegend.end}
            </S.RangeLegendItem>
            <S.RangeLegendItem>
              <S.RangeLegendSwatch
                $accentColor={accentColor}
                $variant="between"
              />
              {monthGrid.rangeLegend.inRange}
            </S.RangeLegendItem>
          </S.RangeLegend>
          {hasActiveRange ? (
            <S.ClearRangeButton onClick={onClearRange}>
              {monthGrid.clearRangeButton}
            </S.ClearRangeButton>
          ) : (
            <S.RangeHint>
              {monthGrid.rangeHintPrefix} {holidayCount}
            </S.RangeHint>
          )}
        </S.RangeToolbar>

        <S.Grid>
          {days.map((day) => {
            const count = entryCounts[day.dateKey] ?? 0;

            return (
              <S.DateCell
                key={day.dateKey}
                $isSelected={day.isSelected}
                $isCurrentMonth={day.isCurrentMonth}
                $isToday={day.isToday}
                $isRangeStart={day.isRangeStart}
                $isRangeEnd={day.isRangeEnd}
                $isInRange={day.isInRange}
                $accentColor={accentColor}
                onClick={() => onSelectDate(day.date)}
              >
                <S.DateNumber>{day.date.getDate()}</S.DateNumber>
                {day.isHoliday ? (
                  <S.HolidayMarker $isSelected={day.isSelected}>
                    {monthGrid.holidayMarker}
                  </S.HolidayMarker>
                ) : null}
                {day.isToday ? (
                  <S.TodayMarker $isSelected={day.isSelected} />
                ) : null}
                <S.CountLabel>
                  {count > 0 ? (
                    <S.Dot
                      $accentColor={accentColor}
                      $isSelected={day.isSelected}
                    />
                  ) : null}
                </S.CountLabel>
              </S.DateCell>
            );
          })}
        </S.Grid>
      </S.CalendarSection>
    </S.Wrapper>
  );
};
