import { generateRandomId } from '$root/helpers/generateRandomId'
import type { Todo } from '$root/types/Todo'
import { validate_component } from 'svelte/internal'
import { useStorage } from './useStorage'

let todos = useStorage<Array<Todo>>('todos', [])

// Add a todo to todo list
function addTodo(todo: string): void {
	let newTodo: Todo = {
		id: generateRandomId(),
		text: todo,
		completed: false,
	}

	todos.update((todos) => [...todos, newTodo])
}

// Mark all todos as completed or not completed
function toggleAllTodos(event: MouseEvent): void {
	const { checked } = event.target as HTMLInputElement

	todos.update((todos) =>
		todos.map((todo) => ({
			...todo,
			completed: checked,
		}))
	)
}

// Mark a todo as completed or not completed
function toggleTodo(id: string): void {
	todos.update((todos) =>
		todos.map((todo) => {
			if (todo.id === id) {
				todo.completed = !todo.completed
			}

			return todo
		})
	)
}

// Remove a todo
function removeTodo(id: string): void {
	todos.update((todos) => todos.filter((todo) => todo.id !== id))
}

// Edit a todo
function editTodo(id: string, text: string): void {
	todos.update((todos) =>
		todos.map((todo) => {
			if (todo.id === id) {
				return {
					...todo,
					text,
				}
			}

			return todo
		})
	)
}

// Remove all completed todos
function clearCompletedTodos(): void {
	todos.update((todos) => todos.filter((todo) => !todo.completed))
}

export {
	todos,
	addTodo,
	toggleAllTodos,
	toggleTodo,
	removeTodo,
	editTodo,
	clearCompletedTodos,
}
