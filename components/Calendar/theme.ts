import { CalendarTheme } from "@marceloterreiro/flash-calendar";
import Theme from "styles/Theme";

export const linearTheme: CalendarTheme = {
    rowMonth: {
        container: {
            display: "none",
        },
    },
    rowWeek: {
        container: {
            borderBottomWidth: 1,
            borderBottomColor: Theme.colors.lightGray,
            borderStyle: "solid",
        },
    },
    itemWeekName: { content: { color: Theme.colors.mediumGray } },
    itemDayContainer: {
        activeDayFiller: {
            backgroundColor: Theme.colors.primary,
        },
    },
    itemDay: {
        idle: ({ isPressed, isWeekend }) => ({
            container: {
                backgroundColor: isPressed
                    ? Theme.colors.primary
                    : "transparent",
                borderRadius: 4,
            },
            content: {
                color:
                    isWeekend && !isPressed
                        ? Theme.colors.red
                        : Theme.colors.darkest,
            },
        }),
        today: ({ isPressed }) => ({
            container: {
                borderColor: Theme.colors.primary,
                borderRadius: 4,
                backgroundColor: isPressed
                    ? Theme.colors.primary
                    : "transparent",
            },
            content: {
                color: isPressed ? "#ffffff" : Theme.colors.primary,
            },
        }),
        active: ({ isEndOfRange, isStartOfRange }) => ({
            container: {
                backgroundColor: Theme.colors.primary,
                borderTopLeftRadius: isStartOfRange ? 4 : 0,
                borderBottomLeftRadius: isStartOfRange ? 4 : 0,
                borderTopRightRadius: isEndOfRange ? 4 : 0,
                borderBottomRightRadius: isEndOfRange ? 4 : 0,
            },
            content: {
                color: "#ffffff",
            },
        }),
    },
};
