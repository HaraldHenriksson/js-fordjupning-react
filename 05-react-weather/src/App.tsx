import { useEffect, useState } from 'react'
import Forecast from './components/Forecast'
import SearchCity from './components/SearchCity'
import { getCurrentWeather } from './services/owmapi'
import { ICurrentWeather } from './types'
import Airplane from './assets/images/747.svg'
import './assets/scss/App.scss'

function App() {

	const [loading, setLoading] = useState(false)

	const [error, setError] = useState<string | null>(null)

	const [currentWeather, setCurrentWeather] = useState<ICurrentWeather | null>(null)

	const search = async (data: string) => {

		if (data.length < 3) {
			setError('Has to be at least 3 characters')
			return
		}
		setLoading(true);
		setError(null);
		try {
			const weather = await getCurrentWeather(data);
			setCurrentWeather(weather);
		} catch (error) {
			setError("City invalid");
		}
		setLoading(false);
	};


	return (
		<div id="app" className="container">
			<SearchCity onSearch={search} />

			{loading ? (
				<img src={Airplane} alt={"Loading..."} />
			) : error ? (
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			) : (
				currentWeather && < Forecast data={currentWeather} />
			)}
		</div>
	)
}

export default App
