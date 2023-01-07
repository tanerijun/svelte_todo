<script lang="ts">
	import {
		addTodo,
		clearCompletedTodos,
		editTodo,
		removeTodo,
		todos,
		toggleAllTodos,
		toggleTodo,
	} from '$root/stores/todos'
	import { tick } from 'svelte'
	import type { Filter, Todo } from '$root/types/Todo'
	import AddTodo from './AddTodo.svelte'
	import TodoComponent from './Todo.svelte'
	import TodosFilter from './TodosFilter.svelte'
	import TodosLeft from './TodosLeft.svelte'
	import ClearCompleted from './ClearCompleted.svelte'

	let filter: Filter = 'all'
	let filtering = false

	// derived
	$: todosLeft = $todos.filter((todo) => !todo.completed).length
	$: todosCompleted = $todos.length - todosLeft
	$: filteredTodos = filterTodos($todos, filter)
	$: animationDuration = filtering ? 0 : 250

	async function setFilter(selectedFilter: Filter): Promise<void> {
		filtering = true
		await tick()
		filter = selectedFilter
		await tick()
		filtering = false
	}

	// Filter todos based on selected filter
	function filterTodos(todos: Array<Todo>, filter: Filter): Array<Todo> {
		switch (filter) {
			case 'all':
				return todos
			case 'active':
				return todos.filter((todo) => !todo.completed)
			case 'completed':
				return todos.filter((todo) => todo.completed)
		}
	}
</script>

<main>
	<h1 class="title">Todo List</h1>

	<section class="todos">
		<AddTodo {addTodo} {toggleAllTodos} showMarkAll={$todos.length > 0} />

		{#if $todos.length > 0}
			<ul class="todo-list">
				{#each filteredTodos as todo (todo.id)}
					<TodoComponent
						{todo}
						{toggleTodo}
						{removeTodo}
						{editTodo}
						{animationDuration}
					/>
				{/each}
			</ul>
		{/if}

		<div class="actions">
			<TodosLeft {todosLeft} />
			<TodosFilter selectedFilter={filter} {setFilter} />
			<ClearCompleted hidden={todosCompleted === 0} {clearCompletedTodos} />
		</div>
	</section>
</main>

<style>
	.title {
		font-size: var(--font-80);
		font-weight: inherit;
		text-align: center;
		color: var(--color-title);
	}

	.todos {
		--width: 500px;
		--todos-bg: hsl(0 0% 98%);
		--todos-text: hsl(220 20% 14%);

		width: var(--width);
		color: var(--todos-text);
		background-color: var(--todos-bg);
		border-radius: var(--radius-base);
		border: 1px solid var(--color-gray-90);
		box-shadow: 0 0 4px var(--shadow-1);
	}

	.todo-list {
		list-style: none;
	}

	.actions {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--spacing-8) var(--spacing-16);
		font-size: 0.9rem;
		border-top: 1px solid var(--color-gray-90);
	}

	.actions:before {
		content: '';
		height: 40px;
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		box-shadow: 0 1px 1px hsla(0, 0%, 0%, 0.2), 0 8px 0 -3px hsl(0, 0%, 96%),
			0 9px 1px -3px hsla(0, 0%, 0%, 0.2), 0 16px 0 -6px hsl(0, 0%, 96%),
			0 17px 2px -6px hsla(0, 0%, 0%, 0.2);
		z-index: -1;
	}
</style>
