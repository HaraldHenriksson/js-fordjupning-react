import { useEffect, useState } from 'react'
import Forecast from './components/Forecast'
import SearchCity from './components/SearchCity'
import { getCurrentWeather } from './services/owmapi'
import { ICurrentWeather } from './types'
import Airplane from './assets/images/747.svg'
import './assets/scss/App.scss'

function App() {

	const [currentWeather, setCurrentWeather] = useState<ICurrentWeather|null>(null)

	const search = async (data: string) => {

		const weather = await getCurrentWeather(data)
		console.log(weather)

		setCurrentWeather(weather)
	}


	return (
		<div id="app" className="container">
			<SearchCity onSearch={search} />

			{currentWeather && < Forecast  data={currentWeather}/>}
		</div>
	)
}

export default App
