import moment from "moment";

export const getAgeString = (isoString: string): string => {
    const duration = moment.duration(moment().diff(moment(isoString)));

    const years = duration.years();
    const months = duration.months();
    const days = duration.days();

    if (years === 0) {
        if (months === 0) {
            if (days === 1) {
                return `${days} dia`;
            }
            return `${days} dias`;
        } else {
            if (months === 1) return `${months} mês`;
            return `${months} meses`;
        }
    } else {
        if (months === 0) {
            if (years === 1) {
                return `${years} ano`;
            }
            return `${years} anos`;
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
