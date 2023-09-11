import { PacmanLoader } from "react-spinners"

const GlobalLoadingSpinner = () => {

    return (
        <div id="global-loading-spinner-wrapper">
            <PacmanLoader color="#007bff" size={20} speedMultiplier={1.5} />
        </div>
    )
}

export default GlobalLoadingSpinner
