<script lang="ts">
	import * as Popover from "$lib/components/ui/popover";
	import { Button, type Props as ButtonProps } from "$lib/components/ui/button";
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import { cn } from "$lib/utils";

	let {
		ref = $bindable(null),
		class: className,
		open = false,
		children,
		...restProps
	}: ButtonProps & {
		open?: boolean;
	} = $props();
</script>

<Popover.Trigger bind:ref class={cn("w-full shadow-none", className)}>
	{#snippet child({ props })}
		<Button
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="w-full justify-between gap-2"
			{...props}
			{...restProps}
		>
			{@render children?.()}
			<ChevronsUpDownIcon class="size-4 shrink-0 opacity-50" />
		</Button>
	{/snippet}
</Popover.Trigger>

