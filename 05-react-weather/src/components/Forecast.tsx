import React from 'react'
import forecastBanner from '../assets/images/forecast-banner.png'
import { ICurrentWeather } from '../types'
import dayBanner from '../assets/images/day.svg'
import nightBanner from '../assets/images/night.svg'

interface Iprops {
	data: ICurrentWeather
}

const Forecast: React.FC<Iprops> = ({ data }) => {
	const banner = data.dt > data.sys.sunrise && data.dt < data.sys.sunset
		? dayBanner
		: nightBanner

	const freshness = new Date(data.dt * 1000).toLocaleString()


	return (
		<div id="forecast">
			<div className="card">

				<img src={banner} className="card-img-top" alt="Daytime, nighttime, daytime, nighttime" />

				<div className="card-body">
					<h5 className="card-title" id="location">
						<span id="city">${data.name}</span>,
						<span id="country">{data.sys.country}</span>
					</h5>
					<p className="temp">
						<span id="temperature">{data.main.temp}</span>
						&deg;C
					</p>
					<p className="humidity">
						<span id="humidity">{data.main.humidity}</span> % humidity
					</p>
					<p className="wind">
						<span id="windspeed">{data.wind.speed}</span> m/s
					</p>

					<ul className="conditions">
						{data.weather.map(condition => (
							<li key={condition.id}>
								<img
									src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`}
									title={condition.main}
									alt={condition.main}
								/>
								{condition.description}
							</li>
						))}
					</ul>


					<p className="text-muted small">
						<span>
							{freshness}
						</span>
					</p>

				</div>

			</div>
		</div>
	)
}

export default Forecast
