import Image from 'react-bootstrap/Image'
import SadKittyCat from '../assets/images/404.avif'

const NotFound = () => {
    return (
        <>
            <Image src={SadKittyCat} fluid />
        </>
    )
}

export default NotFound
