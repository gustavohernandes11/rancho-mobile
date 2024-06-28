import { Animal, Batch, Item } from "types";
import { Annotation } from "types/Annotation";
import {
	formatAnnotationType,
	getFormattedAge,
	getFormattedGender,
	getFormattedPtBRDate,
} from "./formatters";

export const serializeAnimals = (animals: Animal[]): Item[] =>
	animals.map((a) => ({
		key: a.name,
		value: a.id,
	})) || [];

export const serializeBatches = (batches: Batch[]): Item[] =>
	batches.map((b) => ({
		key: b.name,
		value: b.id,
	})) || [];

export const nullifyFalsyFields = (obj: any) => {
	const clone = { ...obj };
	for (const key in clone) {
		if (clone.hasOwnProperty(key) && !clone[key]) {
			clone[key] = null;
		}
	}
	return clone;
};

export const serializeAnimalInfo = (animal?: Animal): Item[] => {
	let items: Item[] = [];
	if (!animal) return items;

	if (animal.name) items.push({ key: "Nome", value: animal.name });
	if (animal.gender)
		items.push({
			key: "Gênero",
			value: getFormattedGender(animal.gender),
		});
	if (animal.code)
		items.push({ key: "Código", value: animal.code.toString() });
	if (animal.birthdate) {
		items.push({
			key: "Idade",
			value: getFormattedAge(animal.birthdate),
		});
		items.push({
			key: "Data de nascimento",
			value: new Date(animal.birthdate).toLocaleDateString("pt-BR"),
		});
	}
	if (animal.observation)
		items.push({ key: "Observação", value: animal.observation });

	return items;
};

export const serializeAnnotation = (annotation?: Annotation): Item[] => {
	let items: Item[] = [];
	if (!annotation) return items;

	items.push({
		key: "Tipo",
		value: formatAnnotationType(annotation.type),
	});
	if (annotation.date)
		items.push({
			key: "Data",
			value: getFormattedPtBRDate(annotation.date),
		});
	if (annotation.medicineName)
		items.push({ key: "Vacina/Medicação", value: annotation.medicineName });
	if (annotation.dosage)
		items.push({ key: "Dosagem", value: annotation.dosage });

	return items;
};

export const serializeBatchInfo = (batch?: Batch) => {
	let items: Item[] = [];
	if (!batch) return items;

	if (batch.description) {
		items.push({ key: "Descrição", value: batch.description });
	}

	items.push({
		key: "Número de animais",
		value: batch.count > 0 ? batch.count.toString() : "Vazio",
	});

	return items;
};

export const serializeAnimalPreview = (animal?: Animal): Item[] => {
	let items: Item[] = [];
	if (!animal) return items;

	if (animal.name) items.push({ key: "Nome", value: animal.name });
	if (animal.gender)
		items.push({
			key: "Gênero",
			value: getFormattedGender(animal.gender),
		});
	if (animal.code)
		items.push({ key: "Código", value: animal.code.toString() });

	return items;
};
