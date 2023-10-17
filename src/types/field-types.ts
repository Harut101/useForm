export type InternalFieldName = string;

export type FieldName = string;

export type FieldValue<TFieldValues extends FieldValues> = TFieldValues[InternalFieldName];

export type FieldValues = Record<string, any>;

export type NativeFieldValue = string | number | boolean | null | undefined | unknown[];

export type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export type Ref = FieldElement;

export type Field = {
  _f: {
    ref: Ref;
    name: InternalFieldName;
  };
};

export type FieldRefs = Partial<Record<InternalFieldName, Field>>;
