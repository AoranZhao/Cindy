import React, {Component} from 'react';
import './Weather.css';

export default class Weather extends Component {
	static displayName = "Weather";

	constructor(props) {
		super(props);
		this.state = {
			support: false,
			success: false
		}
	}

	componentDidMount() {
		if(self.fetch) {
			this.setState({
				support: true
			});
			fetch("http://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=231d440c2a1ef352a7d2683e10d55e06")
			.then(response => response.json())
			.then(data => this.setState({weather: data}))
			.catch(error => console.log(error.message));
		} else {
			this.setState({
				support: false
			})
		}
	}

	toCelsius(Kelvin) {
		return (Kelvin - 273.15).toFixed(1);
	}

	toWind(wind) {
		var direction = (wind.deg === 0) ? "North" :
			(wind.deg < 45) ? "North-northeast" : 
			(wind.deg === 45) ? "Northeast" :
			(wind.deg < 90) ? "East-northeast" :
			(wind.deg === 90) ? "East" :
			(wind.deg < 135) ? "East-southeast" :
			(wind.deg === 135) ? "Southeast" : 
			(wind.deg < 180) ? "South-southeast" :
			(wind.deg === 180) ? "South" :
			(wind.deg < 225) ? "South-southwest" :
			(wind.deg === 225) ? "Southwest" :
			(wind.deg < 270) ? "West-southwest" :
			(wind.deg === 270) ? "West" :
			(wind.deg < 315) ? "West-northwest" :
			(wind.deg === 315) ? "Northwest" : "North-northwest";
		var str = "speed " + wind.speed + "m/s " + direction + " (" + wind.deg + ")";
		return str;
	}

	toDate(sec) {
		var date = new Date(sec * 1000);
		var months = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");
		var weekdays = "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",");
		var str = "";
		str += weekdays[date.getDay()] + " " + months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		return str;
	}

	toTime(sec) {
		var date = new Date(sec * 1000);
		var str = "";
		str += date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		return str;
	}

	_weather_render() {
		if(this.state.support) {
			if(this.state.weather) {
				var data = this.state.weather;
				return(
					<div>
						<h2>Weahter in {data.name} {data.sys.country}</h2>
						<h2><img alt={data.weather[0].main} src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} style={{verticalAlign: "middle"}} /> {this.toCelsius(data.main.temp)} &#176;C</h2>
						<p>{data.weather[0].main}</p>
						<p>get at {this.toDate(data.dt)}</p>
						<table className="weathertable">
							<tbody>
								<tr>
									<td>Wind</td>
									<td>{this.toWind(data.wind)}</td>
								</tr>
								<tr>
									<td>Weather</td>
									<td>{data.weather[0].description}</td>
								</tr>
								<tr>
									<td>Pressure</td>
									<td>{data.main.pressure} hpa</td>
								</tr>
								<tr>
									<td>Humidity</td>
									<td>{data.main.humidity} %</td>
								</tr>
								<tr>
									<td>Sunrise</td>
									<td>{this.toTime(data.sys.sunrise)}</td>
								</tr>
								<tr>
									<td>Sunset</td>
									<td>{this.toTime(data.sys.sunset)}</td>
								</tr>
								<tr>
									<td>Geo coords</td>
									<td>[{data.coord.lat}, {data.coord.lon}]</td>
								</tr>
							</tbody>
						</table>
					</div>
					);
			}
		} else {
			return(<p>Your browser does not support fetch, please use new version firefox or chrome</p>);
		}
	}

	render() {
		return(
			<div className="weather">
				{this._weather_render()}
			</div>
			);
	}
}

