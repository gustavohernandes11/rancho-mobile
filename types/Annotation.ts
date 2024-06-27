type BaseAnnotation = {
	id: number;
	title: string;
	type: AnnotationTypeOption;
	description?: string;
	date?: Date;
};
export type AnnotationTypeOption =
	| "simple"
	| "death"
	| "purchase"
	| "heath care"
	| "sell";
interface AnimalRelatedAnnotation extends BaseAnnotation {
	animalIDs?: number[];
}
export interface SimpleAnnotation extends BaseAnnotation {
	type: "simple";
}
export interface AnimalPurchaseAnnotation extends AnimalRelatedAnnotation {
	type: "purchase";
}
export interface AnimalSellAnnotation extends AnimalRelatedAnnotation {
	type: "sell";
}
export interface AnimalDeathAnnotation extends AnimalRelatedAnnotation {
	type: "death";
}
export interface HealthManagementAnnotation extends AnimalRelatedAnnotation {
	type: "heath care";
	dosage?: string;
	medicineName?: string;
}
export type Annotation = {
	id: number;
	title: string;
	type: AnnotationTypeOption;
	description?: string;
	date?: Date;
	animalIDs?: number[];
	dosage?: string;
	medicineName?: string;
};

export type AddAnnotation = Omit<Annotation, "id">;
export type UpdateAnnotation = Partial<Annotation> & { id: number };
