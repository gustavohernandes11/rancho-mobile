import { Paragraph } from "components/Paragraph";
import { Span } from "components/Span";
import { getAgeString } from "utils/getAgeString";

type AnimalAgeProps = {
    birthdate?: string;
};

export const AnimalAge = ({ birthdate }: AnimalAgeProps) => (
    <Span justify="flex-end" marginX={16}>
        <Paragraph secondary>{birthdate && getAgeString(birthdate)}</Paragraph>
    </Span>
);
