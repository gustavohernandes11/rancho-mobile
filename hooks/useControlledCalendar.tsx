import { toDateId } from "@marceloterreiro/flash-calendar";
import moment from "moment";
import { useState } from "react";

const today = toDateId(new Date());
export const useControlledCalendar = () => {
    const [selectedDateId, setSelectedDateId] = useState(today);

    const onPressNextMonth = () => {
        setSelectedDateId(prevDateId => {
            const newDate = moment(prevDateId)
                .add(1, "months")
                .format("YYYY-MM-DD");
            return newDate;
        });
    };

    const onPressPrevMonth = () => {
        setSelectedDateId(prevDateId => {
            const newDate = moment(prevDateId)
                .subtract(1, "months")
                .format("YYYY-MM-DD");
            return newDate;
        });
    };

    return {
        selectedDateId,
        setSelectedDateId,
        onPressNextMonth,
        onPressPrevMonth,
    };
};
