import { fireEvent, render, screen } from '@testing-library/svelte'
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
})
