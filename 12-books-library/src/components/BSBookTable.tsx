import React from 'react'
import Table from 'react-bootstrap/Table'
import { Book } from '../types/BooksAPI.types'

interface IProps {
    books: Book[]
}

const BSBookTable: React.FC<IProps> = ({ books }) => {
    if (!books.length) {
        return <p>No books for you!</p>
    }

    return (
        <Table responsive striped hover bordered>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th className='text-end'>Pages</th>
                    <th>Published</th>
                </tr>
            </thead>
            <tbody>
                {books && books.map(book => (
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author.name}</td>
                        <td className='text-end'>{book.pages}</td>
                        <td>{book.published}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default BSBookTable
