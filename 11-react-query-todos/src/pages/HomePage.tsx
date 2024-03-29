import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { toast } from "react-toastify"

const HomePage = () => {
	return (
		<>
			<h1>Welcome to Better Todos!</h1>

			<ButtonGroup>
				<Button
					variant="primary"
					onClick={() =>
						toast("Wow such click much wow very celebrate")
					}
				>
					Celebrate!
				</Button>

				<Button
					variant="success"
					onClick={() => {
						toast.success(
							"Wow such success, very influcencer, much money!"
						)
					}}
				>
					Click me!
				</Button>

			</ButtonGroup>
		</>
	)
}

export default HomePage
