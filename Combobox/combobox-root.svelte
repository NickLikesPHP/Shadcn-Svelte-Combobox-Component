<script lang="ts">
	import * as Popover from "$lib/components/ui/popover";
	import { Popover as PopoverPrimitive } from "bits-ui";
	import { setComboboxContext } from "./combobox-context.svelte";

	type SingleProps = {
		type: "single";
		value?: string;
		onValueChange?: (value: string) => void;
	};

	type MultipleProps = {
		type: "multiple";
		values?: string[];
		onValuesChange?: (values: string[]) => void;
	};

	type Props = PopoverPrimitive.RootProps & {
		open?: boolean;
		children?: any;
		value?: string;
		values?: string[];
		onValueChange?: (value: string) => void;
		onValuesChange?: (values: string[]) => void;
	} & (SingleProps | MultipleProps);

	let {
		type,
		open = $bindable(false),
		value = $bindable(undefined),
		values = $bindable(undefined),
		onValueChange,
		onValuesChange,
		children,
		...restProps
	}: Props = $props();

	function handleSelect(itemValue: string) {
		if (type === "single") {
			value = itemValue;
			onValueChange?.(itemValue);
			open = false;
		} else {
			const currentValues = values || [];
			if (currentValues.includes(itemValue)) {
				values = currentValues.filter((v: string) => v !== itemValue);
			} else {
				values = [...currentValues, itemValue];
			}
			onValuesChange?.(values);
		}
	}

	function isSelected(itemValue: string): boolean {
		if (type === "single") {
			return value === itemValue;
		} else {
			return (values || []).includes(itemValue);
		}
	}

	// Provide context for child components
	setComboboxContext({
		type,
		handleSelect,
		isSelected,
	});
</script>

<Popover.Root bind:open {...restProps}>
	{@render children?.()}
</Popover.Root>

