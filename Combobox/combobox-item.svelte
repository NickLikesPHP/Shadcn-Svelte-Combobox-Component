<script lang="ts">
	import * as Command from "$lib/components/ui/command";
	import CheckIcon from "@lucide/svelte/icons/check";
	import { Checkbox } from "$lib/components/ui/checkbox";
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
	{#if context?.variant === "multiple"}
		<Checkbox checked={selected} class="mr-2" />
	{:else}
		<CheckIcon class={cn("mr-2 size-4", !selected && "text-transparent")} />
	{/if}
	{@render children?.()}
</Command.Item>

