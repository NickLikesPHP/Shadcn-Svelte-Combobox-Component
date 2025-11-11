<script lang="ts">
	import { Popover } from "bits-ui";
	import { setComboboxContext } from "./combobox-context.svelte";

	type SingleProps = {
		variant: "single";
		value?: string;
		onValueChange?: (value: string) => void;
	};

	type MultipleProps = {
		variant: "multiple";
		values?: string[];
		onValuesChange?: (values: string[]) => void;
	};

	type Props = Popover.RootProps & {
		open?: boolean;
		children?: any;
	} & (SingleProps | MultipleProps);

	let {
		variant,
		open = $bindable(false),
		value = $bindable(undefined),
		values = $bindable(undefined),
		onValueChange,
		onValuesChange,
		children,
		...restProps
	}: Props & { value?: string; values?: string[] } = $props();

	function handleSelect(itemValue: string) {
		if (variant === "single") {
			value = itemValue;
			onValueChange?.(itemValue);
			open = false;
		} else {
			const currentValues = values || [];
			if (currentValues.includes(itemValue)) {
				values = currentValues.filter(v => v !== itemValue);
			} else {
				values = [...currentValues, itemValue];
			}
			onValuesChange?.(values);
		}
	}

	function isSelected(itemValue: string): boolean {
		if (variant === "single") {
			return value === itemValue;
		} else {
			return (values || []).includes(itemValue);
		}
	}

	// Provide context for child components
	setComboboxContext({
		variant,
		handleSelect,
		isSelected,
	});
</script>

<Popover.Root bind:open {...restProps}>
	{@render children?.()}
</Popover.Root>

