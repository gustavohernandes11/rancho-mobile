import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import Colors from "styles/Colors";
import { AnnotationTypeOption } from "types/Annotation";

export const getFormattedAge = (isoString: string): string => {
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

export const getFormattedGender = (gender: "F" | "M") =>
    gender === "M" ? "♂ Macho" : "♀ Fêmea";

export const getGenderIcon = (gender: "F" | "M") =>
    gender === "M" ? (
        <FontAwesome
            accessibilityLabel="Mars icon"
            color={Colors.blue}
            name="mars"
        />
    ) : (
        <FontAwesome
            accessibilityLabel="Jupter icon"
            color={Colors.red}
            name="venus"
        />
    );

export const getFormattedPtBRDate = (date: Date) => {
    const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
    };

    const formatter = new Intl.DateTimeFormat("pt-BR", options as any);
    return formatter.format(date);
};

export const getFormattedMonthAndYear = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${year}`;
};

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
