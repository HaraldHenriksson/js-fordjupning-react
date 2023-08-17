import React, { useState } from 'react'
import { useQuery } from "@tanstack/react-query"
import { HN_SearchResponse } from '../types/HN.types'
import { searchByDate } from '../services//HackerNewsAPI'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Pagination from '../components/Pagination'
import { useSearchParams } from 'react-router-dom'

const SearchPage: React.FC = () => {
	const [searchInput, setSearchInput] = useState('')
	const [searchParams, setSearchParams] = useSearchParams()
	const query = searchParams.get('query') ?? ""
	const [page, setPage] = useState(0)

	const { data: searchResult, error, isLoading } = useQuery<HN_SearchResponse>(
		['search', query, page],
		() => searchByDate(query || '', page)
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!searchInput.trim().length) {
			return;
		}

		setSearchParams({ query: searchInput })
	};

	return (
		<>
			<h1>🔎🔦👀</h1>

			<Form className="mb-4" onSubmit={handleSubmit}>
				<Form.Group className="mb-3" controlId="searchQuery">
					<Form.Label>Search Query</Form.Label>
					<Form.Control
						onChange={(e) => setSearchInput(e.target.value)}
						placeholder="Enter your search query"
						required
						type="text"
						value={searchInput}
					/>
				</Form.Group>

				<div className="d-flex justify-content-end">
					<Button
						variant="success"
						type="submit"
						disabled={!searchInput.trim().length}
					>
						Search
					</Button>
				</div>
			</Form>

			{error && <Alert variant="warning">An error occurred while fetching data</Alert>}

			{isLoading && <p>🤔 Loading...</p>}

			{searchResult && (
				<div id="search-result">
					<p>Showing {new Intl.NumberFormat().format(searchResult.nbHits)} search results for "{query}"...</p>

					<ListGroup className="mb-3">
						{searchResult.hits.map((hit) => (
							<ListGroup.Item action href={hit.url} key={hit.objectID}>
								<h2 className="h3">{hit.title}</h2>
								<p className="text-muted small mb-0">
									{hit.points} points by {hit.author} at {hit.created_at}
								</p>
							</ListGroup.Item>
						))}
					</ListGroup>

					<Pagination
						page={page}
						totalPages={searchResult.nbPages}
						hasPreviousPage={page > 0}
						hasNextPage={page + 1 < searchResult.nbPages}
						onPreviousPage={() => setPage(prevPage => prevPage - 1)}
						onNextPage={() => setPage(prevPage => prevPage + 1)}
					/>
				</div>
			)}
		</>
	);
};

export default SearchPage;
