import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import useGetData from '../hooks/useGetData'
import { Spinner } from 'react-bootstrap'

const RandomDogPage = () => {
    const { data, setUrl } = useGetData("https://dog.ceo/api/breeds/image/random")

    return (
        <>
            <h1>A random doggo 🐶</h1>

            <div>
                <Button
                    variant="primary"
                    onClick={() => setUrl("https://dog.ceo/api/breeds/image/random")}
                >Random Doggo</Button>

                <Button
                    variant="primary"
                    onClick={() => setUrl("https://dog.ceo/api/breed/boxer/images/random")}
                >Random Boxer Doggo</Button>
            </div>

            {!data && <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>}

            <div>
                {data && data.status === "success" && <Image src={data.message} fluid />}
            </div>
        </>
    )
}

export default RandomDogPage
