<script lang="ts">
	import * as Command from "$lib/components/ui/command";
	import { cn } from "$lib/utils";

	let {
		class: className,
		placeholder = "Search...",
		...restProps
	}: {
		class?: string;
		placeholder?: string;
		[key: string]: any;
	} = $props();
</script>

<Command.Input class={cn("", className)} {placeholder} {...restProps} />

