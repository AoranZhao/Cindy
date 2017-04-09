import React, {Component} from 'react';
import './Exchange.css';

const quotes = ['USDAUD', 'USDGBP', 'USDJPY', 'USDEUR', 'USDCHF', 'USDCNY'];

export default class Exchagne extends Component {
	static displayName = "Exchange";

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
			})
			fetch("http://apilayer.net/api/live?access_key=d812325b8613b14e2bdbef7dabc98927")
			.then(response => response.json())
			.then(data => this.setState({exchange: data}))
			.catch(error => console.log(error.message))
		} else {
			this.setState({
				support: false
			})
		}
	}

	toDate(sec) {
		var date = new Date(sec * 1000);
		var months = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");
		var weekdays = "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(",");
		var str = "";
		str += weekdays[date.getDay()] + " " + months[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		return str;
	}

	_exchange_render() {
		if(this.state.support) {
			if(this.state.exchange) {
				var data = this.state.exchange;
				if(data.success) {
					var arr = [];
					quotes.map((item, index) => {
						arr.push({key: item, value: data.quotes[item]});
					})
					return(
						<table className="exchagnetable">
							<thead className="exchagnetablehead"><tr><td colSpan="2">{data.source}</td></tr></thead>
							<tbody className="exchagnetablebody">
								{arr.map((item, index) => (
									<tr key={index}>
										<td>{item.key}</td>
										<td>{item.value}</td>
									</tr>
									))}
							</tbody>
						</table>
						);
				}
			} else {
				return(<p>Look like some problems happens, we did not get exchange rate</p>);
			}
		} else {
			return(<p>Your browser does not support fetch, please use new version firefox or chrome</p>);
		}
	}

	render() {
		return(
			<div className="exchange">
				<h2>Live Exchange Rate</h2>
				{this._exchange_render()}
			</div>
			);
	}
}