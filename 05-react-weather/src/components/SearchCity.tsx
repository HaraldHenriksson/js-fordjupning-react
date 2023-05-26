import React, { useState } from 'react'

interface Iprops {
	onSearch: (searchInput: string) => void
}

const SearchCity: React.FC<Iprops> = ({ onSearch }) => {

	const [searchInput, setSearchInput] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		onSearch(searchInput)

		setSearchInput('')
	}

	const tooFewCharacters = searchInput.trim().length > 0 && searchInput.trim().length < 3

	return (
		<div id="search-wrapper">
			<form id="search-form"
				onSubmit={handleSubmit}>
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Enter city to search for" aria-label="City" aria-details="Search for city to show current weather for."
						onChange={e => setSearchInput(e.target.value)}
						value={searchInput}
					/>

					<button
						disabled={searchInput.trim().length < 3}
						type="submit"
						className="btn btn-success"
					>🔍</button>
				</div>

				{tooFewCharacters && (
					<div className="form-text" role="alert">
						Please enter at least 3 characters
					</div>)}
			</form>
		</div>
	)

}
export default SearchCity
