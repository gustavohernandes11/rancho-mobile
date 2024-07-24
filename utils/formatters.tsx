import moment from "moment";
import { AnnotationTypeOption } from "types";

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
