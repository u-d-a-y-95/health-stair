export type CellProps = {
  onPressHandler?: (value: string) => void;
  active?: boolean;
  value?: string;
  color?: string;
  disabled?: boolean;
};

export type CalendarHeaderProps = {
  monthNames: string[];
  date: Date;
  nextMonth: () => void;
  prevMonth: () => void;
  isNextMonthDisabled: boolean;
  isPrevMonthDisabled: boolean;
};

export type UCalendarProps = {
  onChange: (date: Date) => void;
};

export type WeekHeaderProps = {
  weekDaysHeader: string[];
};

export type Day = {
  value: number;
  color: string;
  active?: boolean;
  disabled: boolean;
};

export type DayGridProps = {
  days: Day[][];
  selectDate: (value: number) => void;
};

export type UseCalendarResult = {
  date: Date;
  days: Day[][];
  weekDaysHeader: string[];
  monthNames: string[];
  nextMonth: () => void;
  prevMonth: () => void;
  selectDate: (value: number) => void;
  isNextMonthDisabled: boolean;
  isPrevMonthDisabled: boolean;
};
