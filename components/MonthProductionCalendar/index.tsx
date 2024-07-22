import React, { useEffect, useState } from "react";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { Storage } from "services/StorageService";
import Theme from "styles/Theme";
import { DayProduction } from "types/Production";
import { formatDateToISO } from "utils/formatters";
import { calendarTheme } from "./calendarTheme";

interface MonthProductionCalendarProps {
    onSelectDate: (date: Date) => void;
    selectedDate: Date;
}

LocaleConfig.defaultLocale = "pt-br";

const fetchProductionData = async (
    setProduction: React.Dispatch<React.SetStateAction<DayProduction[]>>
) => {
    const prod = await Storage.listPopulatedMonthProduction(new Date());
    setProduction(prod);
};

const getMarkedDates = (
    production: DayProduction[],
    selectedDateInISO: string
) => {
    return production.reduce((acc, prod) => {
        const dateISO = formatDateToISO(new Date(prod.day));
        acc[dateISO] = {
            marked: !!prod.quantity,
            selected: dateISO === selectedDateInISO,
        };
        return acc;
    }, {} as { [key: string]: { marked: boolean; selected: boolean } });
};

export const MonthProductionCalendar: React.FC<
    MonthProductionCalendarProps
> = ({ selectedDate, onSelectDate }) => {
    const [production, setProduction] = useState<DayProduction[]>([]);

    useEffect(() => {
        fetchProductionData(setProduction);
    }, []);

    const handleDayPress = (day: DateData) => {
        onSelectDate(new Date(day.year, day.month - 1, day.day));
    };

    const selectedDateInISO = formatDateToISO(selectedDate);
    const markedDates = getMarkedDates(production, selectedDateInISO);

    return (
        <Calendar
            onDayPress={handleDayPress}
            markedDates={{
                ...markedDates,
            }}
            enableSwipeMonths
            theme={calendarTheme}
            style={{
                borderColor: Theme.colors.lightGray,
                borderWidth: 1,
                borderRadius: 8,
            }}
        />
    );
};

export const calendarLocalePtBr = {
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

LocaleConfig.locales["pt-br"] = calendarLocalePtBr;
