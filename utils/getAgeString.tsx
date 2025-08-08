import moment from "moment";

export const getAgeString = (isoString: string): string => {
    const start = moment(isoString);
    const now = moment();

    const years = now.diff(start, "years");
    start.add(years, "years");
    const months = now.diff(start, "months");
    start.add(months, "months");
    const days = now.diff(start, "days");

    if (years === 0) {
        if (months === 0) {
            return days === 1 ? `${days} dia` : `${days} dias`;
        } else {
            if (months === 1) {
                return days > 0
                    ? `${months} mês e ${days} ${days === 1 ? "dia" : "dias"}`
                    : `${months} mês`;
            }
            return days > 0
                ? `${months} meses e ${days} ${days === 1 ? "dia" : "dias"}`
                : `${months} meses`;
        }
    } else {
        if (months === 0) {
            return years === 1 ? `${years} ano` : `${years} anos`;
        } else {
            if (years === 1 && months === 1) {
                return `${years} ano e ${months} mês`;
            }
            if (months === 1) {
                return `${years} anos e ${months} mês`;
            }
            if (years === 1) {
                return `${years} ano e ${months} meses`;
            }
            return `${years} anos e ${months} meses`;
        }
    }
};
