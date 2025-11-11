<script lang="ts">
	import * as Command from "$lib/components/ui/command";
	import { cn } from "$lib/utils";

	let {
		class: className,
		children,
		...restProps
	}: {
		class?: string;
		children?: any;
		[key: string]: any;
	} = $props();
</script>

<Command.Empty class={cn("", className)} {...restProps}>
	{@render children?.()}
</Command.Empty>

