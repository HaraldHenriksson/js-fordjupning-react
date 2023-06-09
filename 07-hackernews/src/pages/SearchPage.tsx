import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import { useSearchParams } from 'react-router-dom'
import { searchByDate as HN_searchByDate } from '../services/HackerNewsAPI'
import { HN_SearchResponse } from '../types'
import HandlePage from '../components/HandlePage'

const SearchPage = () => {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [searchInput, setSearchInput] = useState("")
    const [searchResult, setSearchResult] = useState<HN_SearchResponse | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const query = searchParams.get("query")

    const searchHackerNews = async (searchQuery: string, searchPage = 0) => {
        setError(null)
        setLoading(true)
        setSearchResult(null)

        try {
            const res = await HN_searchByDate(searchQuery, searchPage)
            setSearchResult(res)

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message)
        }

        setLoading(false)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        // haxx0r
        if (!searchInput.trim().length) {
            return
        }

        // search HN
        setCurrentPage(0)

        //set input value as query in searchParams
        setSearchParams({ query: searchInput })

        searchHackerNews(searchInput, 0)
    }

    // react to changes in our page state
    useEffect(() => {
        if (!query) {
            return
        }

        searchHackerNews(query, currentPage)
    }, [currentPage, query])

    return (
        <>
            <h1>🔎🔦👀</h1>

            <Form className="mb-4" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="searchQuery">
                    <Form.Label>Search Query</Form.Label>
                    <Form.Control
                        onChange={e => setSearchInput(e.target.value)}
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
                    >Search</Button>
                </div>
            </Form>

            {error && <Alert variant='warning'>{error}</Alert>}

            {loading && <p>🤔 Loading...</p>}

            {searchResult && (
                <div id="search-result">
                    <p>Showing {searchResult.nbHits} search results for "{query}"...</p>

                    <ListGroup className="mb-3">
                        {searchResult.hits.map(hit => (
                            <ListGroup.Item
                                action
                                href={hit.url}
                                key={hit.objectId}
                            >
                                <h2 className="h3">{hit.title}</h2>
                                <p className="text-muted small mb-0">
                                    {hit.points} points by {hit.author} at {hit.created_at}
                                </p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <HandlePage
                        currentPage={currentPage}
                        totalPages={searchResult.nbPages}
                        hasPreviousPage={currentPage > 0}
                        hasNextPage={currentPage + 1 < searchResult.nbPages}
                        onPreviousPage={() => { setCurrentPage(prevValue => prevValue - 1) }}
                        onNextPage={() => { setCurrentPage(prevValue => prevValue + 1) }}
                    />
                </div>
            )}
        </>
    )
}

export default SearchPage
