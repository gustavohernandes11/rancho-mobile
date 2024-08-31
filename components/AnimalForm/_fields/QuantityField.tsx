import { Input } from "components/Input";
import { AnimalFormField } from "types/AnimalFormField";
import { getFieldError } from "utils/getFieldError";

export const QuantityField: React.FC<AnimalFormField> = ({ formik }) => {
    return (
        <Input
            label="Quantidade"
            value={formik.values?.quantity?.toString()}
            onChangeText={quantity =>
                formik.setFieldValue("quantity", quantity)
            }
            errorText={getFieldError("quantity", formik)}
            keyboardType="number-pad"
        />
    );
};
