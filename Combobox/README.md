# Combobox Component

A simplified combobox component similar in structure to the select component, but with search functionality.

## Structure

The Combobox component is split into several sub-components:

- **Root**: Popover root wrapper
- **Trigger**: The button that opens the combobox
- **Content**: The command root container
- **Input**: Search input field
- **List**: Container for items
- **Empty**: Empty state message
- **Group**: Groups items together
- **Item**: Individual selectable item

## Usage

### Single Selection

```svelte
<script lang="ts">
	import * as Combobox from "$lib/components/general/Combobox";
	
	let value = $state("");
	let open = $state(false);
	
	const frameworks = [
		{ value: "sveltekit", label: "SvelteKit" },
		{ value: "nextjs", label: "Next.js" },
		{ value: "remix", label: "Remix" },
	];
</script>

<Combobox.Root variant="single" bind:value bind:open>
	<Combobox.Trigger {open}>
		<span class="text-sm">
			{frameworks.find(f => f.value === value)?.label || "Select..."}
		</span>
	</Combobox.Trigger>
	<Combobox.Content>
		<Combobox.Input placeholder="Search frameworks..." />
		<Combobox.List>
			<Combobox.Empty>No framework found.</Combobox.Empty>
			<Combobox.Group>
				{#each frameworks as framework}
					<Combobox.Item value={framework.value}>
						{framework.label}
					</Combobox.Item>
				{/each}
			</Combobox.Group>
		</Combobox.List>
	</Combobox.Content>
</Combobox.Root>
```

### Multiple Selection

```svelte
<script lang="ts">
	import * as Combobox from "$lib/components/general/Combobox";
	
	let values = $state<string[]>([]);
	let open = $state(false);
	
	const frameworks = [
		{ value: "sveltekit", label: "SvelteKit" },
		{ value: "nextjs", label: "Next.js" },
		{ value: "remix", label: "Remix" },
	];
</script>

<Combobox.Root variant="multiple" bind:values bind:open>
	<Combobox.Trigger {open}>
		<span class="text-sm">
			{values.length > 0 ? `${values.length} selected` : "Select..."}
		</span>
	</Combobox.Trigger>
	<Combobox.Content>
		<Combobox.Input placeholder="Search frameworks..." />
		<Combobox.List>
			<Combobox.Empty>No framework found.</Combobox.Empty>
			<Combobox.Group>
				{#each frameworks as framework}
					<Combobox.Item value={framework.value}>
						{framework.label}
					</Combobox.Item>
				{/each}
			</Combobox.Group>
		</Combobox.List>
	</Combobox.Content>
</Combobox.Root>
```

## Props

### Root

**Single variant:**
- `variant`: "single" (required)
- `value`: string (bindable) - Selected value
- `onValueChange`: (value: string) => void - Callback when value changes
- `open`: boolean (bindable) - Whether the popover is open

**Multiple variant:**
- `variant`: "multiple" (required)
- `values`: string[] (bindable) - Selected values
- `onValuesChange`: (values: string[]) => void - Callback when values change
- `open`: boolean (bindable) - Whether the popover is open

All variants also accept standard Popover.Root props.

### Trigger

- `open`: boolean - Whether the popover is open
- All standard Button props

### Item

- `value`: string (required) - The value of the item
- All standard Command.Item props

Note: Selection state is managed by Root via context, no need to pass `selected` or `onSelect`.

### Other Components

All other components accept their respective Command component props

## Differences from Select

- Uses Command component for search functionality
- Simpler structure (no scroll buttons, separators, or labels)
- Focused on searchable dropdown use cases
- Less comprehensive but easier to customize

