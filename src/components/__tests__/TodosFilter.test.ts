import type { Filter } from '$root/types/Todo'
import { screen, render } from '@testing-library/svelte'
import TodosFilter from '../TodosFilter.svelte'

function renderTodosFilter(selectedFilter: Filter) {
	let props = {
		selectedFilter,
		setFilter: vi.fn(),
	}

	render(TodosFilter, { ...props })

	let filterAllElement = screen.getByText(/all/i)
	let filterActiveElement = screen.getByText(/active/i)
	let filterCompletedElement = screen.getByText(/completed/i)

	return {
		filterAllElement,
		filterActiveElement,
		filterCompletedElement,
	}
}

describe('Testing TodosFilter', () => {
	it('should should only give the selected styles to "all" filter when "all" is selected', () => {
		let { filterAllElement, filterActiveElement, filterCompletedElement } =
			renderTodosFilter('all')

		expect(filterAllElement).toHaveClass('selected')
		expect(filterActiveElement).not.toHaveClass('selected')
		expect(filterCompletedElement).not.toHaveClass('selected')
	})

	it('should should only give the selected styles to "all" filter when "all" is selected', () => {
		let { filterAllElement, filterActiveElement, filterCompletedElement } =
			renderTodosFilter('active')

		expect(filterAllElement).not.toHaveClass('selected')
		expect(filterActiveElement).toHaveClass('selected')
		expect(filterCompletedElement).not.toHaveClass('selected')
	})

	it('should should only give the selected styles to "all" filter when "all" is selected', () => {
		let { filterAllElement, filterActiveElement, filterCompletedElement } =
			renderTodosFilter('completed')

		expect(filterAllElement).not.toHaveClass('selected')
		expect(filterActiveElement).not.toHaveClass('selected')
		expect(filterCompletedElement).toHaveClass('selected')
	})
})
