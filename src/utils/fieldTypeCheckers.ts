import { FieldElement } from "form-manager-hook";

export const isRadioInput = (element: FieldElement): element is HTMLInputElement => element.type === "radio";
export const isCheckboxInput = (element: FieldElement): element is HTMLInputElement => element.type === "checkbox";
export const isSelect = (element: FieldElement): element is HTMLSelectElement => element.tagName?.toLowerCase() === "select";
