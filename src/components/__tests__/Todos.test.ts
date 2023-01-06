import { fireEvent, render, screen, waitFor } from '@testing-library/svelte'
import Todos from '../Todos.svelte'

afterEach(() => {
	localStorage.clear()
})

describe('Testing Todos', () => {
	it('should render a todo item when the user add it', async () => {
		render(Todos)
		let value = 'Todo item'
		let todoInputElement = screen.getByPlaceholderText(
			/what needs to be done?/i
		)

		await fireEvent.input(todoInputElement, { target: { value } })
		await fireEvent.submit(todoInputElement)

		expect(screen.getByText(value)).toBeInTheDocument()
	})

	it('should render multiple todos when user add them', async () => {
		render(Todos)
		let values = ['Todo Item 1', 'Todo Item 2', 'Todo Item 3', 'Todo Item 4']
		let todoInputElement = screen.getByPlaceholderText(
			/what needs to be done?/i
		)

		for (let value of values) {
			await fireEvent.input(todoInputElement, { target: { value } })
			await fireEvent.submit(todoInputElement)
			expect(screen.getByText(value)).toBeInTheDocument()
		}
	})

	it('should allow user to edit todo', async () => {
		render(Todos)
		let value = 'to be changed'
		let todoInputElement = screen.getByPlaceholderText(
			/what needs to be done?/i
		)

		await fireEvent.input(todoInputElement, { target: { value } })
		await fireEvent.submit(todoInputElement)

		let todo = screen.getByText(value)
		await fireEvent.doubleClick(todo)

		let changedValue = 'changed'
		let editInputElement = screen.getByTestId('edit')

		await fireEvent.input(editInputElement, { target: { value: changedValue } })
		await fireEvent.keyDown(document.activeElement, { key: 'Enter' })

		expect(todo).toHaveTextContent(changedValue)
		expect(screen.queryByText(value)).toBeNull()
	})

	it('should allow user to remove todo', async () => {
		render(Todos)
		let value = 'To be removed'
		let todoInputElement = screen.getByPlaceholderText(
			/what needs to be done?/i
		)

		await fireEvent.input(todoInputElement, { target: { value } })
		await fireEvent.submit(todoInputElement)

		expect(screen.getByText(value)).toBeInTheDocument()

		let removeTodoButton = screen.getAllByTestId('remove').pop()
		await fireEvent.click(removeTodoButton)

		await waitFor(
			() => {
				expect(screen.queryByText(value)).not.toBeInTheDocument()
			},
			{ timeout: 1250 }
		)
	})
})
