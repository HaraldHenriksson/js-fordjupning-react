import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import TodoForm from "../TodoForm"
import { describe, it, expect } from "vitest"

const fakeOnSave = async () => {
	return
}
const todoTitle = "This is my todo title"

const renderWithUserInteraction = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: React.ReactElement<any, string | React.JSXElementConstructor<any>>
) => {
	return {
		user: userEvent.setup(),
		...render(component)
	}
}

describe("Todo Form", () => {
	it("Renders input field initially empty", () => {
		// Render
		render(<TodoForm onSave={fakeOnSave} />)

		// Find
		const inputElement = screen.getByRole("textbox")
		// const inputElement = screen.getByLabelText("What do you need to do?")

		// Assert
		expect(inputElement).toHaveValue("")
	})

	it("Can type into input field", async () => {
		// Render (with user interaction)
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />)

		// Find
		const inputElement: HTMLInputElement = screen.getByRole("textbox")

		// Interact
		// inputElement.value = "lalala"
		await user.type(inputElement, todoTitle)

		// Assert
		expect(inputElement).toHaveValue(todoTitle)
	})

	it("Empties input field after clicking on the 'Save' button", async () => {
		// Render (with user interaction)
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />)

		// Find
		const inputElement: HTMLInputElement = screen.getByRole("textbox")
		const btnSaveElement = screen.getByRole("button", { name: /save/i })

		// Interact
		await user.type(inputElement, todoTitle, {})
		await user.click(btnSaveElement)

		// Assert
		expect(inputElement).toHaveValue("")
	})

	it("Empties input field after pressing <Enter>", async () => {
		// Render (with user interaction)
		const { user } = renderWithUserInteraction(<TodoForm onSave={fakeOnSave} />)

		// Find
		const inputElement: HTMLInputElement = screen.getByRole("textbox")

		// Interact
		await user.type(inputElement, todoTitle)
		await user.type(inputElement, "{Enter}")

		// Assert
		expect(inputElement).toHaveValue("")
	})
})
