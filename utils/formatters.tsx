import moment from "moment";
import { Icon } from "react-native-paper";
import Theme from "styles/Theme";
import { AnimalStatusOptions, AnnotationTypeOption } from "types";

export const formatAge = (isoString: string): string => {
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

export const formatGender = (gender: "F" | "M") =>
    gender === "M" ? "♂ Macho" : "♀ Fêmea";

export const getGenderIcon = (gender: "F" | "M") =>
    gender === "M" ? (
        <Icon source="gender-male" color={Theme.colors.blue} size={16} />
    ) : (
        <Icon source="gender-female" color={Theme.colors.red} size={16} />
    );

export const formatDateToLongPtBR = (date: Date) => {
    return moment(date).locale("pt-br").format("D [de] MMMM [de] YYYY");
};

export const formatDateToShortPtBR = (date: Date) => {
    const options = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("pt-BR", options as any);
    return formatter.format(date);
};

export const formatDateToISO = (date: Date) => date.toISOString().split("T")[0]; // Format the date to YYYY-MM-DD
export const formatMonthToISO = (date: Date) => moment(date).format("YYYY-MM"); // Format the date to YYYY-MM

export const formatAnnotationType = (type: AnnotationTypeOption) => {
    switch (type) {
        case "simple":
            return "Simples";
        case "sell":
            return "Venda";
        case "death":
            return "Morte";
        case "purchase":
            return "Compra";
        case "heath care":
            return "Manejo Sanitário";

        default:
            return "";
    }
};

export const formatAnimalStatus = (
    type: AnimalStatusOptions
): React.ReactNode => {
    switch (type) {
        case "active":
            return "Ativo";
        case "dead":
            return "Morto";
        case "sold":
            return "Vendido";

        default:
            return "";
    }
};

export const getAnimalStatusIcon = (status: AnimalStatusOptions) => {
    switch (status) {
        case "active":
            return (
                <Icon
                    color={Theme.colors.primary}
                    source="thumb-up"
                    size={16}
                />
            );
        case "dead":
            return (
                <Icon
                    color={Theme.colors.mediumGray}
                    source="coffin"
                    size={16}
                />
            );
        case "sold":
            return (
                <Icon
                    color={Theme.colors.orange}
                    source="truck-delivery"
                    size={16}
                />
            );
        default:
            return null;
    }
};
