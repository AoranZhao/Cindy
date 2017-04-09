import React, {Component} from 'react';

import Weather from '../components/Weather';
import Forecast from '../components/Forecast';

export default class Environment extends Component {
	render() {
		return(
			<div style={{width: `100%`, overflow: 'auto'}}>
				<div style={{width: '35%', float: 'left', padding: '5px'}}>
					<Weather />
				</div>
				<Forecast />
			</div>
			);
	}
}