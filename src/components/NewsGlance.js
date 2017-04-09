import React, {Component} from 'react';
import './NewsGlance.css';

export default class NewsGlance extends Component {
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
			fetch("https://newsapi.org/v1/articles?source=bbc-news&apiKey=d8339fa27f3e4faf9bed931b54f85bcd")
			.then(response => response.json())
			.then(data => this.setState({news: data}))
			.catch(error => console.log(error.message));
		} else {
			this.setState({
				support: false
			})
		}
	}

	_title_render(source) {
		switch(source) {
			case "bbc-news": return(<h2>News from BBC</h2>);
			default: return(<h2>News</h2>);
		}
	}

	_glance_render(item, index) {
		return(
			<div className="glance" key={index}>
				<a href={item.url} target="_blank">
					<div className="glance_img">
						<img src={item.urlToImage} />
					</div>
					<div className="glance_title">
						<p>{item.title}</p>
					</div>
				</a>
			</div>
			);
	}

	_news_render() {
		if(this.state.support) {
			if(this.state.news) {
				var data = this.state.news;
				if(data.status === "ok") {
					return(
						<div>
							{this._title_render(data.source)}
							{data.articles.map(this._glance_render.bind(this))}
						</div>
						);
				} else {
					return(<p>Look like some problems happens, we did not get news</p>);
				}
			}
		} else {
			return(<p>Your browser does not support fetch, please use new version firefox or chrome</p>);
		}
	}

	render() {
		return(
			<div className="newsglance">
				{this._news_render()}
			</div>
			);
	}
}