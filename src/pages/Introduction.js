import React, {Component} from 'react';
import './Introduction.css';

const experiences = [
	{title: "Software Developer", company: 'BrainCo Inc', location: 'Boston', period: 'Nov 2015 - Feb 2016', desc: ['iOS app: use Object-c design app for signal transform and forward from one device to another, based on TCP protocol', 'website: use MEAN stack, including AngularJS, NodeJS, ExpressJS, MongoDB. REST API is used for back and front end communication', 'desktop app: Python is chosen with other libs, like scipy, numpy, and pyqt. Those are used for transform TCP message to graphs, visualize signal.']},
	{title: "Intern", company: 'World Health Organization', location: 'Geneva', period: 'Jul 2015 - Aug 2015', desc: ['Intern in ACT department. Major work is checking USA donation information, generating report and clear up achieve', 'Meanwhile, I help other departments, like IT and UNAIDS, to index database, clear and classify survey data. The most skills I used are Excel VBA, JavaScript, PHP, and R']},
	{title: "Intranet Manager", company: 'ChengYang People Hospital', location: 'ShanDong', period: 'July 2011 - Aug 2013', desc: ['In IT department. My duty is maintaining database, server and website. Major skills include Oracle, .NET, Sql server 2008, and IIS.']}
	];

const educations = [
	{major: "Information Technology Solutions, Postgraduate", school: "Humber College, Canada", period: "2014 - 2016", desc: "- Applied Technique: Client/Browser/Server program, Database design, Linux bash and Project management"},
	{major: "Computer Science and Technology, Bachelor", school: "Shandong University of Science and Technology, China", period: "2007 - 2011", desc: "- Studies: Mathematics, Calculus, Linear algebra, Set Theory, Probability and Statistics, Cryptology, Computer Science, Principle of compiling, Networking, Database, various program language"}
	];

const me = {
	location: 'Toronto, ON, Canada',
	email: 'aoran_zhao@yahoo.ca',
	phone: '6479498092',
	desc: 'Self-motivation, self-learning, and positive attitude in group are my features, so I am fully capable for responsibility of finishing job, no matter solely or cooperatively.'
}

export default class Introduction extends Component {

	_experience_render(item, index) {
		return(
			<div key={index} className="experience-item">
				<p className="experience-item-period">{item.period}</p>	
				<p className="experience-item-title">{item.title}</p>				
							
				<p className="experience-item-company">{item.company}</p>
				{item.desc.map((item, index) => (
					<div key={index} className="experience-item-desc">
						<p>{"• " + item}</p>
					</div>
					))}				
			</div>
			);
	}

	_education_render(item, index) {
		return(
			<div key={index} className="education-item">
				<p className="education-item-period">{item.period}</p>
				<p className="education-item-major">{item.major}</p>
				<p className="education-item-school">{item.school}</p>
				<p className="education-item-desc">{item.desc}</p>
			</div>
			);
	}

	render() {
		return(
			<div className="introduction">
				<div className="intro-side">
					<div className="intro-side-img">
						<img src="./profile.jpg" />
					</div>
					<div className="intro-side-info">
						<div className="intro-side-info-title"><p>Info</p></div>
						<div className="intro-side-info-content">
							<div><p>{me.location}</p></div>
							<div><p>{me.email}</p></div>
							<div><p>{me.phone}</p></div>
						</div>
					</div>
					<div className="intro-side-about">
						<div className="intro-side-about-title"><p>About me</p></div>
						<div className="intro-side-about-content"><p>{me.desc}</p></div>
					</div>
				</div>
				<div className="intro-main">
					<div className="intro-main-experiences">
						<div className="intro-main-experiences-title"><p>Experiences</p></div>
						<div className="intro-main-experiences-content">
							{experiences.map(this._experience_render.bind(this))}
						</div>
					</div>
					<div className="intro-main-educations">
						<div className="intro-main-educations-title"><p>Educations</p></div>
						<div className="intro-main-educations-content">
							{educations.map(this._education_render.bind(this))}
						</div>
					</div>
				</div>
			</div>
			);
	}
}