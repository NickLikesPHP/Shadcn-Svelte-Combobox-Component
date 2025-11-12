# Shadcn-Svelte Combobox Component

A simplified, searchable combobox component for Svelte/SvelteKit, built on top of Shadcn-Svelte components. This component combines the structure of a select dropdown with powerful search functionality.

> **⚠️ Disclaimer**: This component was kind of vibe coded. You assume all risks, as is.

---

## 📋 Prerequisites

Before using this component, you need the following dependencies:

### Required Shadcn-Svelte Components
- [Shadcn-Svelte](https://shadcn-svelte.com/docs/installation) - Base UI library
  - [Popover](https://shadcn-svelte.com/docs/components/popover#installation) - For dropdown functionality
  - [Command](https://shadcn-svelte.com/docs/components/command#installation) - For search functionality

### Additional Dependencies
- [Lucide Svelte](https://lucide.dev/guide/packages/lucide-svelte) - Icon library
- [Tailwind CSS V4](https://tailwindcss.com/docs/installation/framework-guides/sveltekit) - Styling framework

---

## 🏗️ Component Structure

The Combobox is split into modular sub-components for maximum flexibility:

| Component | Description |
|-----------|-------------|
| **Root** | Popover root wrapper that manages state |
| **Trigger** | Button that opens/closes the combobox |
| **Content** | Command root container for the dropdown |
| **Input** | Search input field with filtering |
| **List** | Container for all items |
| **Empty** | Empty state message when no results |
| **Group** | Groups items together (optional) |
| **Item** | Individual selectable item |

---

## 🚀 Usage

### Single Selection

Perfect for selecting one option from a searchable list.

```svelte
<script lang="ts">
	import * as Combobox from "$lib/components/general/Combobox";
	
	let value = $state("");
	let open = $state(false);
	
	const frameworks = [
		{ value: "sveltekit", label: "SvelteKit" },
		{ value: "nextjs", label: "Next.js" },
		{ value: "remix", label: "Remix" },
		{ value: "astro", label: "Astro" },
		{ value: "nuxt", label: "Nuxt.js" },
	];
</script>

<Combobox.Root type="single" bind:value bind:open>
	<Combobox.Trigger {open}>
		<span class="text-sm">
			{frameworks.find(f => f.value === value)?.label || "Select framework..."}
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

Enable users to select multiple options at once.

```svelte
<script lang="ts">
	import * as Combobox from "$lib/components/general/Combobox";
	
	let values = $state<string[]>([]);
	let open = $state(false);
	
	const frameworks = [
		{ value: "sveltekit", label: "SvelteKit" },
		{ value: "nextjs", label: "Next.js" },
		{ value: "remix", label: "Remix" },
		{ value: "astro", label: "Astro" },
		{ value: "nuxt", label: "Nuxt.js" },
	];
</script>

<Combobox.Root type="multiple" bind:values bind:open>
	<Combobox.Trigger {open}>
		<span class="text-sm">
			{values.length > 0 
				? `${values.length} framework${values.length > 1 ? 's' : ''} selected` 
				: "Select frameworks..."}
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

---

## 📚 API Reference

### Root

The root component manages selection state and popover behavior.

#### Single Selection Mode

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"single"` | ✅ | Sets single selection mode |
| `value` | `string` | ❌ | Currently selected value (bindable) |
| `onValueChange` | `(value: string) => void` | ❌ | Callback fired when selection changes |
| `open` | `boolean` | ❌ | Controls popover open state (bindable) |

#### Multiple Selection Mode

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `type` | `"multiple"` | ✅ | Sets multiple selection mode |
| `values` | `string[]` | ❌ | Array of selected values (bindable) |
| `onValuesChange` | `(values: string[]) => void` | ❌ | Callback fired when selection changes |
| `open` | `boolean` | ❌ | Controls popover open state (bindable) |

> **Note**: All standard `Popover.Root` props are also supported.

### Trigger

The button that opens/closes the combobox.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `open` | `boolean` | ❌ | Current open state for styling |

> **Note**: All standard Shadcn-Svelte `Button` props are supported.

### Item

Individual selectable items within the combobox.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `value` | `string` | ✅ | Unique value for this item |

> **Note**: Selection state is automatically managed via context. All standard `Command.Item` props are supported.

### Other Components

- **Content**: Accepts all `Command` component props
- **Input**: Accepts all `Command.Input` props
- **List**: Accepts all `Command.List` props
- **Empty**: Accepts all `Command.Empty` props
- **Group**: Accepts all `Command.Group` props

---

## 🆚 Differences from Shadcn Select

This combobox component offers a different approach compared to the standard Select component:

| Feature | Combobox | Select |
|---------|----------|--------|
| **Search** | ✅ Built-in with Command | ❌ Not included |
| **Structure** | Simpler, focused | More comprehensive |
| **Scroll Controls** | ❌ | ✅ |
| **Separators** | ❌ | ✅ |
| **Labels** | ❌ | ✅ |
| **Customization** | Easier for basic cases | More options out of the box |
| **Use Case** | Searchable dropdowns | Traditional select inputs |

---

## 💡 Tips

- Use **single selection** for traditional dropdown replacements with search
- Use **multiple selection** for tag-like multi-select inputs
- Leverage the `Empty` component to provide helpful feedback when searches return no results
- The `Group` component is optional but useful for categorizing items

---

## 📄 License

As is. No warranties. Use at your own risk.

---

**Enjoy!** 🎉
