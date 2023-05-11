import { useEffect, useState } from "react"

const Clock = () => {
    const [time, setTime] = useState(() => {
		console.log("I'm initing")
		return new Date().toLocaleTimeString()
	})


	useEffect(() => {
        // This will only be executed when the component is mounted 
        //and only after it has been renderd
		console.log("Clock is mounted 🧐 Timer started")

		const intervalId = setInterval(() => {
			setTime(new Date().toLocaleTimeString())
			console.log("tick")
		}, 1000)

        return () => {
            // This clean-up function will be executed
            // the component is about to be unmounted
            console.log("Clock is being unmounted ⏰ Stopping timer")
            clearInterval(intervalId)
        }
	}, [])

	useEffect(() => {
		document.title = time
	}, [time])

	return (
			<div className="display-1 text-center">
				{time}
			</div>
        )
}

export default Clock