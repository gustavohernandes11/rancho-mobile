import React from "react";
import { Calendar, DateData } from "react-native-calendars";
import { Theme as CalendarTheme } from "react-native-calendars/src/types";
import Theme from "styles/Theme";
import { formatDateToISO } from "utils/formatters";

interface MonthProductionCalendarProps {
    onSelectDate: (date: Date) => void;
    selectedDate: Date;
}
const theme: CalendarTheme = {
    selectedDayBackgroundColor: Theme.colors.primary,
    selectedDayTextColor: Theme.colors.white,
    todayTextColor: Theme.colors.primary,
    dayTextColor: Theme.colors.darkest,
    textDisabledColor: Theme.colors.mediumGray,
    dotColor: Theme.colors.primary,
    selectedDotColor: Theme.colors.white,
    indicatorColor: Theme.colors.primary,
    arrowColor: Theme.colors.primary,
    monthTextColor: Theme.colors.darkGray,
};

import { LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["pt-br"] = {
    monthNames: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro",
    ],
    monthNamesShort: [
        "Jan.",
        "Fev.",
        "Mar.",
        "Abr.",
        "Mai.",
        "Jun.",
        "Jul.",
        "Ago.",
        "Set.",
        "Out.",
        "Nov.",
        "Dez.",
    ],
    dayNames: [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
    ],
    dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."],
};

LocaleConfig.defaultLocale = "pt-br";

export const MonthProductionCalendar: React.FC<
    MonthProductionCalendarProps
> = ({ selectedDate, onSelectDate }) => {
    const handleDayPress = (day: DateData) => {
        onSelectDate(new Date(day.dateString));
    };
    const selectedDateInISO = formatDateToISO(selectedDate);

    const markedDates = {
        [selectedDateInISO]: {
            selected: true,
        },
    };

    return (
        <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            enableSwipeMonths
            theme={theme}
            style={{
                borderColor: Theme.colors.lightGray,
                borderWidth: 1,
                borderRadius: 8,
            }}
        />
    );
};
