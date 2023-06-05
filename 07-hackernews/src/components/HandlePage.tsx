import React from 'react'
import { Button } from 'react-bootstrap'

interface HandlePageProps {
    currentPage: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    onPreviousPage: () => void;
    onNextPage: () => void;
}

const HandlePage: React.FC<HandlePageProps> = ({
    currentPage,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    onPreviousPage,
    onNextPage }) => {


    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="prev">
                <Button
                    disabled={!hasNextPage}
                    onClick={onPreviousPage}
                    variant="primary"
                >Previous Page</Button>
            </div>

            <div className="page">Page {currentPage + 1}/{totalPages}</div>

            <div className="next">
                <Button
                    disabled={!hasPreviousPage}
                    onClick={onNextPage}
                    variant="primary"
                >Next Page</Button>
            </div>
        </div>
    )
}

export default HandlePage