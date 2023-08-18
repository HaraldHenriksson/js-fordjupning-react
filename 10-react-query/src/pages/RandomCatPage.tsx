import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Alert, Button, Image } from "react-bootstrap"
import { getBreedCat } from "../services/TheCatAPI"

const breedOptions = [
    { id: "", label: "Random Cat" },
    { id: "abys", label: "Abyssinian Cat" },
    { id: "aege", label: "Aegean Cat" },
    { id: "bali", label: "Balinese" },
    { id: "bamb", label: "Bambino" }
]

interface Breed {
    id: string
    label: string
}

const RandomCatPage = () => {
    const [selectedBreed, setSelectedBreed] = useState<string>("")

    const {
        data: breedData,
        error: breedError,
        isFetching: breedIsFetching,
        refetch: breedRefetch,
    } = useQuery([`random-${selectedBreed}-cat`], () => getBreedCat(selectedBreed))

    if (breedError) {
        return <Alert variant="error">Oops! The dog chased away the cat</Alert>
    }

    const handleBreedClick = (breed: Breed) => {
        setSelectedBreed(breed.id)
        breedRefetch()
        console.log(breed)
    }

    return (
        <>
            <h1>Cat generator</h1>
            <div className="ms-auto d-flex flex-column align-items-center">
                <div className="d-flex flex-wrap justify-content-center">
                    {breedOptions.map((breed) => (
                        <div key={breed.id} className="mb-3">
                            <Button disabled={breedIsFetching} onClick={() => handleBreedClick(breed)} variant="primary">
                                {breed.label}
                            </Button>
                        </div>
                    ))}
                </div>

                {breedData && !breedIsFetching && (
                    <Image src={breedData?.url} fluid />
                )}
            </div>
        </>
    );
};

export default RandomCatPage;
