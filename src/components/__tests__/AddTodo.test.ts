import { fireEvent, render, screen } from '@testing-library/svelte'

import AddTodo from '../AddTodo.svelte'

function renderAddTodo() {
	let props = {
		addTodo: vi.fn(),
		toggleAllTodos: vi.fn(),
		showMarkAll: false,
	}
	render(AddTodo, { props })
	return props
}

it('should focus input on page load', () => {
	renderAddTodo()
	let todoInputElement = screen.getByPlaceholderText(/what needs to be done/i)
	expect(todoInputElement).toHaveFocus()
})

it('should allow user to type into the input', async () => {
	renderAddTodo()

	let inputValue = 'Todo Item'

	let todoInputElement = screen.getByPlaceholderText(/what needs to be done/i)
	await fireEvent.change(todoInputElement, { target: { value: inputValue } })
	expect(todoInputElement).toHaveValue(inputValue)
})

test('should allow user to submit todo', async () => {
	let { addTodo } = renderAddTodo()

	let inputValue = 'Todo Item'

	let todoInputElement = screen.getByPlaceholderText(/what needs to be done/i)
	await fireEvent.change(todoInputElement, { target: { value: inputValue } })
	await fireEvent.submit(todoInputElement)

	expect(addTodo).toHaveBeenCalledTimes(1)
})
