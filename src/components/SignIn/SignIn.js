import React from 'react';

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
	}

	onEmailChange = (event) => {
		this.setState({ email: event.target.value });
	}

	onPasswordChange = (event) => {
		this.setState({ password: event.target.value });
	}

	onSubmit = () => {
		fetch('http://127.0.0.1:8000/signin', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password
			})
		})
			.then(response => response.json())
			.then(user => {
				if (user.id) {
					this.props.loadUser(user);
					this.props.routeChange('home');
				}
			});
	}

	render() {
		const { routeChange } = this.props;

		return (
			// tachyons cards
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
				{/* tachyons forms */}
				<main className="pa4 black-80">
					<div className="measure">
						<fieldset id="sign_up" className="ba b--transparent ph0 mh0">
							<legend className="f2 fw6 ph0 mh0">Sign In</legend>
							<div className="mt3">
								<label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
								<input
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="email"
									name="email-address"
									id="email-address"
									onChange={this.onEmailChange}
								/>
							</div>
							<div className="mv3">
								<label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
								<input
									className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
									type="password"
									name="password"
									id="password"
									onChange={this.onPasswordChange}
								/>
							</div>
						</fieldset>
						<div className="">
							<input
								className="b ph3 pv2 input-reset ba b--black bg-transparent grow f6 dib pointer"
								type="submit"
								value="Sign in"
								onClick={this.onSubmit}
							/>
						</div>
						<div className="lh-copy mt3">
							<a
								href="#0"
								className="f6 link dim black db"
								onClick={() => routeChange('register')}
							>
								Register
							</a>
						</div>
					</div>
				</main>
			</article>
		);
	}	
}

export default SignIn;