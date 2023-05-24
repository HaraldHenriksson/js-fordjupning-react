import { useEffect, useState } from 'react'
import Forecast from './components/Forecast'
import SearchCity from './components/SearchCity'
import { getCurrentWeather } from './services/owmapi'
import { ICurrentWeather } from './types'
import Airplane from './assets/images/747.svg'
import './assets/scss/App.scss'

function App() {

	const [loading, setLoading] = useState(false)

	const [currentWeather, setCurrentWeather] = useState<ICurrentWeather|null>(null)

	const search = async (data: string) => {

		setLoading(true)

		const weather = await getCurrentWeather(data)
		console.log(weather)

		setCurrentWeather(weather)

		setLoading(false)
	}


	return (
		<div id="app" className="container">
			<SearchCity onSearch={search} />

			{loading ? <img src={Airplane} alt={"Loading..."} /> : currentWeather && < Forecast  data={currentWeather}/>}
		</div>
	)
}

export default App
