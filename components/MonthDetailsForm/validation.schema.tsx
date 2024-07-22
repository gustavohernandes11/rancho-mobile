import * as Yup from "yup";

export const validationSchema = Yup.object({
    fatPorcentage: Yup.number()
        .min(0, "A porcentagem de gordura deve ser um valor positivo")
        .max(100, "A porcentagem de gordura não pode exceder 100")
        .nullable(),
    proteinPorcentage: Yup.number()
        .min(0, "A porcentagem de proteína deve ser um valor positivo")
        .max(100, "A porcentagem de proteína não pode exceder 100")
        .nullable(),
    totalBacteria: Yup.number()
        .min(0, "A contagem bacteriana total deve ser um valor positivo")
        .max(
            1000000000,
            "A contagem bacteriana total não pode exceder 1 bilhão"
        )
        .nullable(),
    totalSomaticCell: Yup.number()
        .min(0, "A contagem de células somáticas deve ser um valor positivo")
        .max(
            1000000000,
            "A contagem de células somáticas não pode exceder 1 bilhão"
        )
        .nullable(),
    pricePerLiter: Yup.number()
        .min(0, "O preço por litro deve ser um valor positivo")
        .max(1000, "O preço por litro não pode exceder R$ 1000")
        .nullable(),
    lactosePorcentage: Yup.number()
        .min(0, "A porcentagem de lactose deve ser um valor positivo")
        .max(100, "A porcentagem de lactose não pode exceder 100")
        .nullable(),
    observation: Yup.string()
        .max(1000, "A observação não pode exceder 1000 caracteres")
        .nullable(),
});
