import React, {Component} from 'react';

import NewsFull from '../components/NewsFull';

export default class News extends Component {
	render() {
		return(
			<div className="news" style={{width: '100%'}}>
				<NewsFull />
			</div>
			);
	}
}