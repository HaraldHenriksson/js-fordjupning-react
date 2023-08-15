import { useQuery } from "@tanstack/react-query"
import { Alert, Button, Image } from "react-bootstrap"
import { getRandomCat } from "../services/TheCatAPI"

const RandomCatPage = () => {

    const {
        data,
        error,
        isFetching,
        refetch,
    } = useQuery(["random-cat"], getRandomCat)

    if (error) {
        return <Alert variant="error">Oops! The dog chased away the cat</Alert>
    }

    console.log(data)

    return (
        <>
            <h1>Random Cat</h1>
            <div className="ms-auto d-flex justify-content-center" >

                {!isFetching && (
                    <div className="mb-3">
                        <Button onClick={() => refetch()} variant="primary">
                            Next
                        </Button>
                    </div>
                )}



                {isFetching && (
                    <p>Loading</p>
                )}

                {data && (
                    <Image src={data?.url} fluid />
                )}

            </div>
        </>

    )
}

export default RandomCatPage
