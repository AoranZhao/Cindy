import React, {Component} from 'react';
import './SideBar.css';

export default class SideBar extends Component {
	static displayName = "SideBar";
	static propTypes = {
		children: React.PropTypes.oneOfType([
			React.PropTypes.object,
			React.PropTypes.array
			])
	};

	render() {
		return(
			<div className="sidebar">
				{this.props.children}
			</div>
			);
	}
}