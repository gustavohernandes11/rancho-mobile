import moment from "moment";
import * as Yup from "yup";

export const validationSchema = Yup.object({
	title: Yup.string()
		.min(3, "Título muito curto!")
		.max(265, "Título muito longo!")
		.required("Campo obrigatório"),
	description: Yup.string().nullable(),
	date: Yup.string()
		.test(
			"is-date-too-old",
			"Use uma data mais próxima da atualidade.",
			(value) =>
				!!value ? moment(value).isAfter(moment().year(1950)) : true
		)
		.nullable(),
});
