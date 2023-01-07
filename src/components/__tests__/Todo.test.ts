import type { Todo } from '$root/types/Todo'
import { fireEvent, render, screen } from '@testing-library/svelte'

import TodoComponent from '../Todo.svelte'

function renderTodo(todo: Todo) {
	let props = {
		todo,
		toggleTodo: vi.fn(),
		removeTodo: vi.fn(),
		editTodo: vi.fn(),
		animationDuration: 0,
	}

	render(TodoComponent, { props })
	return props
}

describe('Testing Todo', () => {
	it('should render todo properly', () => {
		let todo = { id: '1', text: 'Todo A', completed: false }
		renderTodo(todo)

		expect(screen.getByText(/todo a/i)).toBeInTheDocument()
	})

	it('should allow user to check and uncheck the todo', async () => {
		let todo = { id: '1', text: 'Todo A', completed: false }
		renderTodo(todo)

		let checkBox = screen.getByTestId('Todo A')

		await fireEvent.click(checkBox)
		expect(checkBox).toBeChecked()

		await fireEvent.click(checkBox)
		expect(checkBox).not.toBeChecked()
	})

	it('should display a todo with the completed class when checked', async () => {
		let todo = { id: '1', text: 'Todo A', completed: true }
		renderTodo(todo)

		let todoItem = screen.getByText(/todo a/i)
		expect(todoItem).toHaveClass('completed')
	})

	it('should allow user to update todo by pressing ENTER', async () => {
		let todo = { id: '1', text: 'Todo A', completed: false }
		let { editTodo } = renderTodo(todo)

		let todoItem = screen.getByText(/todo a/i)
		await fireEvent.dblClick(todoItem)

		let editingInput = screen.getByTestId(/edit/i)
		await fireEvent.keyDown(editingInput, { key: 'Enter' })
		expect(editTodo).toHaveBeenCalled()
	})

	it('should allow user to update todo by pressing ESCAPE', async () => {
		let todo = { id: '1', text: 'Todo A', completed: false }
		let { editTodo } = renderTodo(todo)

		let todoItem = screen.getByText(/todo a/i)
		await fireEvent.dblClick(todoItem)

		let editingInput = screen.getByTestId(/edit/i)
		await fireEvent.keyDown(editingInput, { key: 'Escape' })
		expect(editTodo).toHaveBeenCalled()
	})
})
