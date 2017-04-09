import React, {Component} from 'react';
import './TopBar.css';

export default class TopBar extends Component {
	_title_render() {
		var d = new Date().getHours();
		var str = (d <= 4) ? "Good Night" : (d < 12) ? "Good Morning" : (d == 12) ? "Good Noon" : (d <= 17) ? "Good Afternoon" : (d <= 21) ? "Good Evening" : "Good Night";
		return str + ", Aoran";
	}

	render() {
		return(
			<div className="topbar">
				<p className="greeting">{this._title_render()}</p>
				<div className="search">
					<form action="http://www.google.com/search" target="_blank" method="get">
						<input type="text" name="q" alt="search" placeholder="Search...." />
						<input type="submit" value="Search" hidden />
					</form>
				</div>
			</div>
			);
	}
}