<script lang="ts">
	export let hidden: boolean
	export let clearCompletedTodos: () => void
</script>

<button
	class="clear-completed"
	class:hidden
	on:click={() => clearCompletedTodos()}>Clear completed</button
>
