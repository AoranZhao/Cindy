import React, {Component} from 'react';

import Weather from '../components/Weather';
import NewsGlance from '../components/NewsGlance';
import Exchange from '../components/Exchange';

export default class Home extends Component {
	render() {
		return(
			<div style={{width: `100%`, overflow: 'auto'}}>
				<div style={{width: '35%', float: 'left', padding: '5px'}}>
					<Weather />
					<Exchange />
				</div>
				<NewsGlance />
			</div>
			);
	}
}