<script lang="ts">
    import * as Popover from "$lib/components/ui/popover";
    import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
    import {cn} from "$lib/utils";
    import type { Snippet } from "svelte";

    let {
        ref = $bindable(null),
        class: className,
        open = false,
        children,
        ...restProps
    }: {
        ref?: HTMLElement | null;
        class?: string;
        open?: boolean;
        children?: Snippet;
        [key: string]: any;
    } = $props();
</script>

<Popover.Trigger 
    bind:ref 
    role="combobox"
    aria-expanded={open}
    class={cn(
        "w-full shadow-none flex items-center justify-between gap-2",
        "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        "h-10 px-4 py-2 rounded-md text-sm text-slate-800",
        "cursor-pointer",
        className
    )}
    {...restProps}
>
    <span class="truncate text-left text-ellipsis whitespace-nowrap overflow-hidden flex-1 min-w-0">
        {@render children?.()}
    </span>
    <ChevronsUpDown class="shrink-0 size-[0.85lh] opacity-50" />
</Popover.Trigger>
