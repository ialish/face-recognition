import React from 'react';

const navStyle = {
	display: 'flex',
	justifyContent: 'flex-end'
};

const Navigation = ({ route, routeChange }) => {
	return (
		<nav style={navStyle}>
			{	route === 'register' ?
					<p
						className='f3 link dim black underline pa3 pointer'
						onClick={() => routeChange('sign in')}
					>
						Sign In
					</p>
				: route === 'sign in' ?
					<p
						className='f3 link dim black underline pa3 pointer'
						onClick={() => routeChange('register')}
					>
						Register
					</p>
				: <p
						className='f3 link dim black underline pa3 pointer'
						onClick={() => routeChange('sign in')}
					>
						Sign Out
					</p>
			}			
		</nav>
	);
}

export default Navigation;