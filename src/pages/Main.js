import React, {Component} from 'react';
import './Main.css';

import TopBar from '../components/TopBar';

export default class Main extends Component {
	static displayName = "Main";
	static propTypes = {
		children: React.PropTypes.oneOfType([
			React.PropTypes.object,
			React.PropTypes.array
			])
	};

	render() {
		return(
			<div className="main">
				<TopBar />
				{this.props.children}
			</div>
			);
	}
}