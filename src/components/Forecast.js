import React, {Component} from 'react';
import './Forecast.css';

export default class Forecast extends Component {
	static displayName = "Forecast";

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
			fetch("http://api.openweathermap.org/data/2.5/forecast?q=Toronto&appid=231d440c2a1ef352a7d2683e10d55e06")
			.then(response => response.json())
			.then(data => this.setState({forecast: data}))
			.catch(error => console.log(error.message));
		} else {
			this.setState({
				support: false
			})
		}
	}

	_forecast_render() {
		if(this.state.support) {
			if(this.state.forecast) {
				var forecast = this.state.forecast;
				var data = [];
				this.state.forecast.list.map((item, index) => {
					var key = item.dt_txt.split(" ")[0];
					if(data.length === 0) {
						data.push({key: key, value: [item]});
					} else {
						if(data[data.length - 1].key === key) data[data.length - 1].value.push(item);
						else data.push({key: key, value: [item]});
					}
				})
				return(
					<div>
						<h2>Hourly weather and forecast in {forecast.city.name} {forecast.city.country}</h2>
						<MyTable data={data} />
					</div>
					);
			}
		} else {
			return(<p>Your browser does not support fetch, please use new version firefox or chrome
				</p>);
		}
	}

	render() {
		return(
			<div className="forecast">
				{this._forecast_render()}
			</div>
			);
	}
}

class MyTable extends Component {
	toCelsius(Kelvin) {
		return (Kelvin - 273.15).toFixed(1);
	}

	toDate(key) {
		var date = new Date(key);
		var months = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");
		var weekdays = "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",");
		var theDate = date.getDate() + 1;
		var str = "";
		str = weekdays[date.getDay()] + " " + months[date.getMonth()] + " " + theDate + " " + date.getFullYear();
		return str;
	}

	_table_render(item, index) {
		return(
			<table key={index} className="forecasttable">
				<thead>
					<tr><td colSpan="2" style={{paddingLeft: "10px"}}>{this.toDate(item.key)}</td></tr>
				</thead>
				<tbody>
					{item.value.map((item, index) => (
						<tr key={index}>
							<td style={{width: "150px", textAlign: "center"}}>{item.dt_txt.split(" ")[1].split(":").slice(0, 2).join(":")}<img alt={item.weather[0].main} src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} style={{verticalAlign: "middle"}}/></td>
							<td style={{width: "400px"}} >{this.toCelsius(item.main.temp)} &#176;C {item.weather[0].description} {this.toCelsius(item.main.temp_min)} {this.toCelsius(item.main.temp_max)} &#176;C {item.wind.speed}m/s. {item.main.pressure} hpa</td>
						</tr>
						))}
				</tbody>
			</table>
			);
	}

	render() {
		var data = this.props.data;
		return(
			<div className="mytable">
				{data.map(this._table_render.bind(this))}
			</div>
			);
	}
}