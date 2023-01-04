<script lang="ts">
	import { generateRandomId } from '$root/helpers/generateRandomId'
	import type { Filter, Todo } from '$root/types/Todo'
	import AddTodo from './AddTodo.svelte'
	import TodoComponent from './Todo.svelte'
	import TodosFilter from './TodosFilter.svelte'

	// dummy data
	let todos: Array<Todo> = [
		{ id: '1e4a59703af84', text: 'Todo 1', completed: true },
		{ id: '9e09bcd7b9349', text: 'Todo 2', completed: false },
		{ id: '9e4273a51a37c', text: 'Todo 3', completed: false },
		{ id: '53ae48bf605cc', text: 'Todo 4', completed: false },
	]

	$: console.log(todos)
	$: todosLeft = todos.filter((todo) => !todo.completed).length
	$: todosCompleted = todos.length - todosLeft

	let filter: Filter = 'all'
	$: filteredTodos = filterTodos(todos, filter)

	// Add a todo to todo list
	function addTodo(todo: string): void {
		let newTodo: Todo = {
			id: generateRandomId(),
			text: todo,
			completed: false,
		}

		todos = [...todos, newTodo]
	}

	// Mark all todos as completed or not completed
	function toggleAllTodos(event: MouseEvent): void {
		const { checked } = event.target as HTMLInputElement

		todos = todos.map((todo) => ({
			...todo,
			completed: checked,
		}))
	}

	// Mark a todo as completed or not completed
	function toggleTodo(id: string): void {
		todos = todos.map((todo) => {
			if (todo.id === id) {
				todo.completed = !todo.completed
			}

			return todo
		})
	}

	// Remove a todo
	function removeTodo(id: string): void {
		todos = todos.filter((todo) => todo.id !== id)
	}

	// Edit a todo
	function editTodo(id: string, text: string): void {
		let currentTodo = todos.findIndex((todo) => todo.id === id)
		todos[currentTodo].text = text
	}

	function setFilter(selectedFilter: Filter): void {
		filter = selectedFilter
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

	// Remove all completed todos
	function clearCompleted(): void {
		todos = todos.filter((todo) => !todo.completed)
	}
</script>

<main>
	<h1 class="title">Todo List</h1>

	<section class="todos">
		<AddTodo {addTodo} {toggleAllTodos} showMarkAll={todos.length > 0} />

		{#if todos.length > 0}
			<ul class="todo-list">
				{#each filteredTodos as todo (todo.id)}
					<TodoComponent {todo} {toggleTodo} {removeTodo} {editTodo} />
				{/each}
			</ul>
		{/if}

		<div class="actions">
			<span class="todo-count">{todosLeft} left</span>
			<TodosFilter selectedFilter={filter} {setFilter} />
			<button
				class="clear-completed"
				class:hidden={todosCompleted === 0}
				on:click={() => clearCompleted()}>Clear completed</button
			>
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
