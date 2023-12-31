import moment from "moment";
import * as Yup from "yup";

export const validationSchema = Yup.object({
	name: Yup.string()
		.min(3, "Nome muito curto!")
		.max(45, "Nome muito longo!")
		.required("Campo obrigatório"),
	gender: Yup.string().oneOf(["F", "M"]).required("Campo obrigatório"),
	birthdate: Yup.date()
		.test(
			"is-a-future-date",
			"A data deve ser menor que a atual",
			(value) => moment(value).isBefore(moment())
		)
		.test(
			"is-date-too-old",
			"Use uma data mais próxima da atualidade.",
			(value) => moment(value).isAfter(moment().year(1950))
		),
	batchId: Yup.string(),
	code: Yup.string(),
	paternityId: Yup.string(),
	maternityId: Yup.string(),
	observation: Yup.string(),
});
