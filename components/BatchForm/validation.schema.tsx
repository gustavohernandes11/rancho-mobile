import * as Yup from "yup";

export const validationSchema = Yup.object({
	name: Yup.string()
		.min(3, "Nome muito curto!")
		.max(45, "Nome muito longo!")
		.required("Campo obrigatório"),
	description: Yup.string().max(256, "Descrição muito longa!"),
});
