import React, {Component} from 'react';
import './PageOne.css';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import SideBar from '../components/SideBar';
import Main from './Main';
import Home from './Home';
import Introduction from './Introduction';
import Environment from './Environment';
import News from './News';
import Contact from './Contact';

import IconHome from 'react-icons/lib/md/home';
import IconPerson from 'react-icons/lib/md/person-pin';
import IconContact from 'react-icons/lib/md/contact-mail';
import IconCloud from 'react-icons/lib/md/cloud';
import IconLanguage from 'react-icons/lib/md/language';
import IconErr from 'react-icons/lib/md/error';

const sidebar_items = [
		{id: 1, title: "home", value: "this is home page", path: "/"}, 
		{id: 2, title: "introduction", value: "this is introduction page", path: "/introduction"},
		{id: 3, title: "environment", value: "this is environment page", path: "/environment"},
		{id: 4, title: "news", value: "this is news page", path: "/news"},
		// {id: 5, title: "contact", value: "this is contact page", path: "/contact"}
		];

export default class PageOne extends Component {
	static displayName = "PageOne";

	_icon_render(title, size) {
		switch(title) {
			case "home": return <IconHome size={size} />;
			case "introduction": return <IconPerson size={size} />;
			case "environment": return <IconCloud size={size} />;
			case "news": return <IconLanguage size={size} />;
			case "contact": return <IconContact size={size} />;
			default: return <IconErr size={size} />;
		}
	}

	_items(item, index) {
		return(
			<div className="sidebar_item" key={index}>
				<Link to={`${item.path}`} className="sidebar_item_icon">
					{this._icon_render(item.title, 40)}
				</Link>
			</div>
			);
	}

	_renderItems() {
		return sidebar_items.map(this._items.bind(this));
	}

	render() {
		return(
			<Router>
				<div className="pageone">
					<SideBar>
						{this._renderItems()}
					</SideBar>
					<Main>
						<Route exact path="/" component={Home} />
						<Route path="/introduction" component={Introduction} />
						<Route path="/environment" component={Environment} />
						<Route path="/news" component={News} />
						<Route path="/contact" component={Contact} />
					</Main>
				</div>
			</Router>
			);
	}
}
