import { createColumnHelper } from '@tanstack/react-table'
import Card from 'react-bootstrap/Card'
import WarningAlert from '../components/alerts/WarningAlert'
import BSAuthorTable from '../components/BSAuthorTable'
// import TanstackSortableTable from '../components/TanstackSortableTable'
import useAuthors from '../hooks/useAuthors'
import { Author } from '../types/BooksAPI.types'
import CreateAuthorForm from '../components/forms/CreateAuthorForm'

/*
const columns: ColumnDef<Author>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'date_of_birth',
		header: 'Date of birth',
	},
]
*/

const columnHelper = createColumnHelper<Author>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const columns = [
	columnHelper.accessor('id', {
		header: 'ID',
	}),
	columnHelper.group({
		header: 'Author Details',
		columns: [
			columnHelper.accessor('name', {
				header: 'Name',
			}),
			columnHelper.accessor('date_of_birth', {
				header: 'Date of birth',
			}),
		],
	}),
	/*
	columnHelper.display({
		id: 'actions',
		cell: (props) => (
			<div className="flex justify-end">
				<button className="btn btn-sm btn-primary">View</button>
				<button className="btn btn-sm btn-warning ml-2">Edit</button>
			</div>
		),
	})
	*/
]

const AuthorsPage = () => {
	const { data: authors, isError, isLoading } = useAuthors()

	return (
		<>
			<h1 className="mb-3">Authors</h1>

			{isError && (
				<WarningAlert>
					An terrible, inexplicable error occurred while fetching authors. It wasn't me!
				</WarningAlert>
			)}

			{isLoading && (
				<p>Loading authors...</p>
			)}

			{/* {authors && <TanstackSortableTable columns={columns} data={authors} />} */}
			{authors && <BSAuthorTable authors={authors} />}

			<hr className="mb-5" />

			<Card>
				<Card.Body>
					<Card.Title>Create Author</Card.Title>
					<CreateAuthorForm />
				</Card.Body>
			</Card>
		</>
	)
}

export default AuthorsPage
