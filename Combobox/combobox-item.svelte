<script lang="ts">
	import * as Command from "$lib/components/ui/command";
	import CheckIcon from "@lucide/svelte/icons/check";
	import { cn } from "$lib/utils";
	import { getComboboxContext } from "./combobox-context.svelte";

	let {
		class: className,
		value,
		children,
		...restProps
	}: {
		class?: string;
		value: string;
		children?: any;
		[key: string]: any;
	} = $props();

	const context = getComboboxContext();

	const selected = $derived(context?.isSelected(value) ?? false);

	function handleSelect() {
		context?.handleSelect(value);
	}
</script>

<Command.Item {value} onSelect={handleSelect} class={cn("", className)} {...restProps}>
	<CheckIcon class={cn("mr-2 size-4", !selected && "text-transparent")} />
	{@render children?.()}
</Command.Item>

