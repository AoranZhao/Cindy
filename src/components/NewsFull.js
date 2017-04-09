import React, {Component} from 'react';
import './NewsFull.css';

const sources = ['bbc-news', 'cnn', 'the-economist', 'time'];

export default class NewsFull extends Component {
	static displayName = "NewsFull";

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
			.then(data => this.setState({bbc: data}))
			.catch(error => console.log(error.message));
			fetch("https://newsapi.org/v1/articles?source=cnn&apiKey=d8339fa27f3e4faf9bed931b54f85bcd")
			.then(response => response.json())
			.then(data => this.setState({cnn: data}))
			.catch(error => console.log(error.message));
			fetch("https://newsapi.org/v1/articles?source=the-economist&apiKey=d8339fa27f3e4faf9bed931b54f85bcd")
			.then(response => response.json())
			.then(data => this.setState({economist: data}))
			.catch(error => console.log(error.message));
			fetch("https://newsapi.org/v1/articles?source=time&apiKey=d8339fa27f3e4faf9bed931b54f85bcd")
			.then(response => response.json())
			.then(data => this.setState({time: data}))
			.catch(error => console.log(error.message));
		} else {
			this.setState({
				support: false
			})
		}
	}

	_news_render() {
		if(this.state.support) {
			return(
				<div style={{width: '100%'}}>
					<NewsPage source="BBC" data={this.state.bbc} />
					<NewsPage source="CNN" data={this.state.cnn} />
					<NewsPage source="The Economist" data={this.state.economist}/>
					<NewsPage source="TIME" data={this.state.time} />
				</div>
				);
		} else {
			return(<p>Your browser does not support fetch, please use new version firefox or chrome</p>);
		}
	}

	render() {
		return(
			<div className="newsfull" style={{width: '100%', overflow: 'auto'}}>
				<h2 style={{marginLeft: '5px'}}>News</h2>
				{this._news_render()}
			</div>
			);
	}
}

class NewsPage extends Component {
	static propTypes = {
		source: React.PropTypes.string,
		data: React.PropTypes.object
	}

	_page(item, index) {
		return(
			<div className="newunit" key={index}>
			<a href={item.url} target="_blank">
				<div className="newunitimg">
					<img src={item.urlToImage} alt={item.title} />
				</div>
				<div className="newunitbody">
					<div className="newunittitle"><p>{item.title}</p></div>
					<div className="newunitdesc"><p>{item.description}</p></div>
				</div>
			</a>
			</div>
			);
	}

	_page_render() {
		if(this.props.data) {
			return(
				<div style={{width: '100%'}}>
					{this.props.data.articles.map(this._page.bind(this))}
				</div>
				);
		} else {
			return(<p>Look like some problems happens, we did not get news</p>);
		}
	}

	render() {
		return(
			<div style={{width: '100%', float: 'left'}}>
				<div className="newfull-title"><p>{this.props.source}</p></div>
				{this._page_render()}
			</div>
			);
	}
}