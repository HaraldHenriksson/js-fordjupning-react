import React, { useState } from 'react'
import forecastBanner from '../assets/images/forecast-banner.png'
import { IWeather, ICurrentWeather } from '../types'

interface Iprops {
	data: ICurrentWeather
}

const Forecast: React.FC<Iprops> = ({ data }) => {

	// const [newData, setNewData] = useState(null)

	// const handleData = (e: React.FormEvent) {
	// 	newWeather(newData)
	// }
	return (
		<div id="forecast">
			<div className="card">

				<img src={forecastBanner} className="card-img-top" alt="Daytime, nighttime, daytime, nighttime" />

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

					{/*
					<p className="text-muted small">
						<span>
							1970-01-01 13:37:00
						</span>
					</p>
				*/}
				</div>

			</div>
		</div>
	)
}

export default Forecast
