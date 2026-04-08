/*
© 2026 Aravinth Raj R. All rights reserved.
Unauthorized copying of this file, via any medium, is strictly prohibited.
Proprietary and confidential.
Written by Aravinth Raj R <aravinthr235@gmail.com>, 2026.
*/
import { CalendarTask } from "../../services";
import { CalendarDayItem } from "../../utils/date";
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
  return (
    <S.Wrapper>
      <S.TodayRail $accentColor={accentColor}>
        <S.TodayHead>
          <S.TodayLabel>Today To-do</S.TodayLabel>
          <S.TodayHeadActions>
            <S.TodayBadge>{todayTasks.length}</S.TodayBadge>
            <S.TodayAddButton
              $accentColor={accentColor}
              onClick={onAddTodayTask}
              aria-label="Add task for today"
            >
              +
            </S.TodayAddButton>
          </S.TodayHeadActions>
        </S.TodayHead>
        <S.TodayList>
          {todayTasks.length === 0 ? (
            <S.TodayEmpty>Nothing planned for today.</S.TodayEmpty>
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
          Open Today
        </S.TodayAction>
      </S.TodayRail>

      <S.CalendarSection $direction={direction}>
        <S.Header>
          <S.Title>{title}</S.Title>
          <S.Actions>
            <S.NavRail>
              <S.NavButton onClick={onPreviousMonth} aria-label="Previous month">
                &#8249;
              </S.NavButton>
              <S.NavDivider />
              <S.NavButton onClick={onNextMonth} aria-label="Next month">
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
              <S.RangeLegendSwatch $accentColor={accentColor} $variant="start" />
              Start
            </S.RangeLegendItem>
            <S.RangeLegendItem>
              <S.RangeLegendSwatch $accentColor={accentColor} $variant="end" />
              End
            </S.RangeLegendItem>
            <S.RangeLegendItem>
              <S.RangeLegendSwatch
                $accentColor={accentColor}
                $variant="between"
              />
              In Range
            </S.RangeLegendItem>
          </S.RangeLegend>
          {hasActiveRange ? (
            <S.ClearRangeButton onClick={onClearRange}>
              Clear Range
            </S.ClearRangeButton>
          ) : (
            <S.RangeHint>
              Pick a start day, then an end day. Holidays this month: {holidayCount}
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
                  <S.HolidayMarker $isSelected={day.isSelected}>Holiday</S.HolidayMarker>
                ) : null}
                {day.isToday ? <S.TodayMarker $isSelected={day.isSelected} /> : null}
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
