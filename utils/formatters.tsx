import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
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
        <FontAwesome
            accessibilityLabel="Mars icon"
            color={Theme.colors.blue}
            name="mars"
        />
    ) : (
        <FontAwesome
            accessibilityLabel="Jupter icon"
            color={Theme.colors.red}
            name="venus"
        />
    );

export const formatDateToLongPtBR = (date: Date) => {
    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("pt-BR", options as any);
    return formatter.format(date);
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

export const formatAnimalStatus = (type: AnimalStatusOptions) => {
    switch (type) {
        case "active":
            return "Ativo no rebanho";
        case "dead":
            return "Morto";
        case "sold":
            return "Vendido";

        default:
            return "";
    }
};
