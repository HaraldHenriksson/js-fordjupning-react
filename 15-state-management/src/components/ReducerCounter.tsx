import { Reducer, useReducer } from 'react'
import Button from 'react-bootstrap/Button'

enum PointsActionTypes {
	INCREMENT = "increment",
	DECREMENT = "decrement",
}

type PointsState = {
	points: number
	game: string
}

type PointsAction = {
	type: PointsActionTypes
}

const initialState: PointsState = {
	points: 0,
	game: "Hackers vs Plebs"
}

const pointsReducer = (state: PointsState, action: PointsAction) => {
	// state = current state
	// action = { type: "increment" }

	switch (action.type) {
		case PointsActionTypes.DECREMENT:
			console.log("Would decrement points", action)
			return {
				...state,
				points: state.points - 1,
			}

		case PointsActionTypes.INCREMENT:
			console.log("Would increment points", action)
			return {
				...state,
				points: state.points + 1,
			}

		default:
			return state
	}
}

const decreasePoints = () => {
	return { type: PointsActionTypes.DECREMENT }
}

const increasePoints = () => {
	return { type: PointsActionTypes.INCREMENT }
}


const ReducerCounter = () => {
	const [state, dispatch] = useReducer<Reducer<PointsState, PointsAction>>(pointsReducer, initialState)

	console.log("Current state:", state)

	return (
		<div className="counter">
			<Button
				variant="warning"
				onClick={() => dispatch(decreasePoints())}
			>-</Button>

			<span className="points">{state.points}</span>

			<Button
				variant="success"
				onClick={() => dispatch(increasePoints())}
			>+</Button>
		</div>
	)
}

export default ReducerCounter
