import React, { useState } from 'react'

interface Iprops {
	onSearch: (searchInput: string) => void
}

const SearchCity: React.FC<Iprops> = ( { onSearch }) => {

	const [searchInput, setSearchInput] = useState('')

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		onSearch(searchInput)
	}

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
						type="submit"
						className="btn btn-success"
					>🔍</button>
				</div>
			</form>
		</div>
	)

}
export default SearchCity
