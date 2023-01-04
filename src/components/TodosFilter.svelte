<script lang="ts">
	import type { Filter } from '$root/types/Todo'

	export let selectedFilter: Filter
	export let setFilter: (selectedFilter: Filter) => void

	let filters: Array<Filter> = ['all', 'active', 'completed']
</script>

<div class="filters">
	{#each filters as filter}
		<button
			class="filter"
			class:selected={filter === selectedFilter}
			on:click={() => {
				setFilter(filter)
			}}>{filter}</button
		>
	{/each}
</div>

<style>
	.filters {
		display: flex;
		gap: var(--spacing-4);
	}

	.filter {
		text-transform: capitalize;
		padding: var(--spacing-4) var(--spacing-8);
		border: 1px solid transparent;
		border-radius: var(--radius-base);
	}

	.filter:hover {
		border: 1px solid var(--color-highlight);
	}

	.selected {
		border-color: var(--color-highlight);
	}
</style>
