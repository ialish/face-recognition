import React, { Component } from 'react';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const particlesParams = {
	particles: {
		number: {
			value: 150,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
};

const initialState = {
	route: 'register',
	input: '',
	imageUrl: '',
	box: {},
	user: {
		id: '',
		name: '',
		email: '',
		entries: 0,
		joined: ''
	}
};

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	onRouteChange = (route) => {
		if (route === 'sign in') {
			this.setState(initialState);
		}
		this.setState({ route: route });
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	}

	loadUser = (data) => {
		this.setState({ user: {
			id: data.id,
			name: data.name,
			email: data.email,
			entries: data.entries,
			joined: data.joined
		} });
	}
	
	calculateFaceLocation = (data) => {
		const image = document.querySelector('#inputImage');
		const width = Number(image.width);
		const height = Number(image.height);
		const face = data.outputs[0].data.regions[0].region_info.bounding_box;
		const boxBorder = {
			leftCol: face.left_col * width,
			topRow: face.top_row * height,
			rightCol: width - (face.right_col * width),
			bottomRow: height - (face.bottom_row * height)
		};
		
		return (boxBorder);
	}

	displayFaceBox = (boxBorder) => {
		this.setState({ box: boxBorder });
	}

	onImageSubmit = () => {
		this.setState({ imageUrl: this.state.input });

		fetch('http://127.0.0.1:8000/imageurl', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				input: this.state.input
			})
		})
			.then(response => response.json())
			.then(response => {
				if (response) {
					fetch('http://127.0.0.1:8000/image', {
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							id: this.state.user.id
						})
					})
						.then(response => response.json())
						.then(count => {
							// copying the object
							this.setState(Object.assign(this.state.user, { entries: count }));
						})
						.catch(err => console.log(err)); // Failure ot the fetch
				}
				this.displayFaceBox(this.calculateFaceLocation(response));
			})
			.catch(err => console.log(err)); // Failure of the Clarifai api
	}

	render() {
		return (
			<div className="App">
				<Particles
					className='particles'
					params={particlesParams}
				/>
				<Navigation
					route={this.state.route}
					routeChange={this.onRouteChange}
				/>
				{	this.state.route === 'register' ?
						<Register
							loadUser={this.loadUser}
							routeChange={this.onRouteChange}
						/>
					: this.state.route === 'sign in' ?
						<SignIn
							loadUser={this.loadUser}
							routeChange={this.onRouteChange}
						/>
					: <div>
							<Logo />
							<Rank
								name={this.state.user.name}
								entries={this.state.user.entries}
							/>
							<ImageLinkForm
								inputChange={this.onInputChange}
								imageSubmit={this.onImageSubmit}
							/>
							<FaceRecognition
								imageUrl={this.state.imageUrl}
								box={this.state.box}
							/>
						</div>
				}
			</div>
		);
	}
}

export default App;