import { getContext, setContext } from "svelte";

const COMBOBOX_CONTEXT_KEY = "combobox";

export type ComboboxContext = {
	variant: "single" | "multiple";
	handleSelect: (value: string) => void;
	isSelected: (value: string) => boolean;
};

export function setComboboxContext(context: ComboboxContext) {
	setContext(COMBOBOX_CONTEXT_KEY, context);
}

export function getComboboxContext(): ComboboxContext | undefined {
	return getContext<ComboboxContext>(COMBOBOX_CONTEXT_KEY);
}

