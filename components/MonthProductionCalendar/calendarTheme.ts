import { Theme as CalendarTheme } from "react-native-calendars/src/types";
import Theme from "styles/Theme";

export const calendarTheme: CalendarTheme = {
    selectedDayBackgroundColor: Theme.colors.primary,
    selectedDayTextColor: Theme.colors.white,
    todayTextColor: Theme.colors.primary,
    dayTextColor: Theme.colors.darkest,
    textDisabledColor: Theme.colors.mediumGray,
    dotColor: Theme.colors.lightGray,
    selectedDotColor: Theme.colors.white,
    indicatorColor: Theme.colors.primary,
    arrowColor: Theme.colors.primary,
    monthTextColor: Theme.colors.darkGray,
};
