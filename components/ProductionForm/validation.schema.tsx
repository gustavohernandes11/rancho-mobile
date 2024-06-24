import * as Yup from "yup";

export const validationSchema = Yup.object({
	quantity: Yup.number()
		.max(100000, "Esse valor é muito alto")
		.required("Especifique os litros produzidos"),
});
