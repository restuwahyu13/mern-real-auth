import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { isAuthToken } from '../auth/AuthToken';
import LogoutAuth from '../auth/LogoutAccount';

const NavbarLayout = ({ history }) => {
	const isActive = (path) => (history.location.pathname === path ? '#0275d8' : '#f7f7f7');

	return (
		<>
			<Navbar expand='lg md' bg='dark'>
				<Navbar.Brand>
					<h5 className='text-light font-weight-light'>MERN FullStack Auth</h5>
				</Navbar.Brand>
				<Nav className='ml-auto mr-3 p-1'>
					<Nav.Item>
						{isAuthToken() && (
							<Link to='/' style={{ color: isActive('/') }} className='text-decoration-none'>
								Home
							</Link>
						)}
					</Nav.Item>
					<Nav.Item>
						{!isAuthToken() && (
							<Link to='/signin' style={{ color: isActive('/signin') }} className='text-decoration-none p-2'>
								Sign-in
							</Link>
						)}
					</Nav.Item>
					<Nav.Item>
						{!isAuthToken() && (
							<Link to='/signup' style={{ color: isActive('/signup') }} className='text-decoration-none  p-2'>
								Sign-up
							</Link>
						)}
					</Nav.Item>
					<Nav.Item>
						{isAuthToken() && (
							<Link to='/app' style={{ color: isActive('/app') }} className='text-decoration-none p-3'>
								App
							</Link>
						)}
					</Nav.Item>
					<Nav.Item>{isAuthToken() && <LogoutAuth />}</Nav.Item>
				</Nav>
			</Navbar>
		</>
	);
};

export default withRouter(NavbarLayout);
