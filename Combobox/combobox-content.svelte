<script lang="ts">
	import * as Command from "$lib/components/ui/command";
	import * as Popover from "$lib/components/ui/popover";
	import { cn } from "$lib/utils";

	let {
		class: className,
		children,
	}: {
		class?: string;
		children?: any;
	} = $props();
</script>

<Popover.Content class={cn("w-full p-0", className)}>
	<Command.Root>
		{@render children?.()}
	</Command.Root>
</Popover.Content>

