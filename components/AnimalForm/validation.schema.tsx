import moment from "moment";
import * as Yup from "yup";

export const validationSchema = Yup.object({
	name: Yup.string()
		.min(3, "Nome muito curto!")
		.max(45, "Nome muito longo!")
		.required("Campo obrigatório"),
	gender: Yup.string().oneOf(["F", "M"]).required("Campo obrigatório"),
	birthdate: Yup.string()
		.transform((curr, orig) => (!!orig ? undefined : curr))
		.notRequired()
		.test(
			"is-a-future-date",
			"A data deve ser menor que a atual",
			(value) => (value ? moment(value).isBefore(moment()) : true)
		)
		.test(
			"is-date-too-old",
			"Use uma data mais próxima da atualidade.",
			(value) =>
				value ? moment(value).isAfter(moment().year(1950)) : true
		)
		.nullable(),
	batchId: Yup.string().nullable(),
	code: Yup.string().nullable(),
	paternityId: Yup.string().nullable(),
	maternityId: Yup.string().nullable(),
	observation: Yup.string().nullable(),
});
