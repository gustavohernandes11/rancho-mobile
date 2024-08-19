import moment from "moment";

export const dateIdToDate = (dateId: string | Date) => moment(dateId).toDate();
