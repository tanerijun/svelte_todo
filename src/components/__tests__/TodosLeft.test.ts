import { screen, render } from '@testing-library/svelte'

import TodosLeft from '../TodosLeft.svelte'

function renderTodosLeft(todosLeft: number) {
	let props = { todosLeft }
	render(TodosLeft, { props })
	return props
}

describe('Testing TodosLeft', () => {
	it('should display how many incomplete todos are left', () => {
		renderTodosLeft(4)
		screen.getByText(/4 left/i)
	})

	it('should say "1 left" if there is only one todo', () => {
		renderTodosLeft(1)
		screen.getByText(/1 left/i)
	})

	it('should say "10 left" if there are 10 todos', () => {
		renderTodosLeft(10)
		screen.getByText(/10 left/i)
	})
})
