import { Calendar as FlashCalendar } from "@marceloterreiro/flash-calendar";
import React from "react";
import { linearTheme } from "./theme";

interface CalendarProps {
    onSelectDate: (dateId: string) => void;
    selectedDate: string;
}

export const Calendar: React.FC<CalendarProps> = ({
    selectedDate,
    onSelectDate,
}) => {
    return (
        <FlashCalendar
            theme={linearTheme}
            calendarActiveDateRanges={[
                {
                    startId: selectedDate,
                    endId: selectedDate,
                },
            ]}
            calendarFormatLocale="pt-BR"
            calendarMonthId={selectedDate}
            onCalendarDayPress={onSelectDate}
            calendarDayHeight={30}
            calendarRowHorizontalSpacing={16}
            calendarRowVerticalSpacing={16}
        />
    );
};
