import { Span } from "components/Span";
import moment from "moment";
import { useState } from "react";
import { Item } from "types/Item";
import { CalendarDropdown } from "./CalendarDropdown";
import { monthItems } from "./monthItems";
import { serializeLastTenYears } from "./serializeLastTenYears";

type MonthAndYearSelectProps = {
    selectedDate: Date;
    setSelectedDate: (props: any) => void;
};

export const MonthAndYearSelect = ({
    selectedDate,
    setSelectedDate,
}: MonthAndYearSelectProps) => {
    const [year, setYear] = useState<number>(selectedDate.getFullYear());
    const [month, setMonth] = useState<number>(
        moment(selectedDate).month() + 1
    );

    const handleSelectMonth = ({ value }: Item) => {
        const newMonth = +value;
        setMonth(newMonth);

        const newDate = new Date(year, newMonth - 1, selectedDate.getDate());
        setSelectedDate(newDate);
    };

    const handleSelectYear = ({ value }: Item) => {
        const newYear = +value;
        setYear(newYear);

        const newDate = new Date(newYear, month - 1, selectedDate.getDate());
        setSelectedDate(newDate);
    };

    const getMonthName = () =>
        monthItems.find(item => item.value === month)?.key.toString() || " ";

    return (
        <Span direction="row">
            <CalendarDropdown
                items={monthItems}
                defaultValue={`${month}`}
                onSelect={handleSelectMonth}
                defaultButtonText={getMonthName()}
            />
            <CalendarDropdown
                items={serializeLastTenYears()}
                defaultValue={`${year}`}
                onSelect={handleSelectYear}
                defaultButtonText={`${year}`}
            />
        </Span>
    );
};
