import axios from 'axios';
import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { authToken } from './AuthToken';

export default function Login({ history }) {
	const [values, setValues] = useState({
		username: '',
		password: '',
		disable: false,
		pointer: '',
		btnText: 'Sign-in',
	});
	const { username, password, disable, pointer, btnText } = values;

	const onSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, disable: true, pointer: 'not-allowed', btnText: 'Sign-in...' });

		setTimeout(() => {
			setValues({
				...values,
				username: '',
				password: '',
				disable: false,
				pointer: '',
				btnText: 'Sign-in',
			});
			axios
				.post('/api/auth/signin', { username, password })
				.then(({ data }) => authToken(data, () => history.push('/')))
				.catch((err) => alert(err.response.data.error));
		}, 2000);
	};

	return (
		<>
			<Container className='mt-3'>
				<Row className='justify-content-center'>
					<Col lg='6' md='6' sm='12'>
						<div className='lead text-center mt-1 p-3'>
							<span style={{ fontSize: '24px', fontWeight: 400 }}>Form Sign-in</span>
						</div>
						<Form onSubmit={onSubmit}>
							<Form.Group>
								<Form.Label className='text-dark font-weight-bold'>Username</Form.Label>
								<Form.Control
									type='text'
									name='username'
									placeholder='Enter Username'
									value={username}
									onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label className='text-dark font-weight-bold'>Password</Form.Label>
								<Form.Control
									type='password'
									name='password'
									placeholder='Enter Password'
									value={password}
									onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
								/>
							</Form.Group>
							<Form.Group className='d-flex justify-content-between mt-2'>
								<button disabled={disable} style={{ cursor: `${pointer}` }} className='btn btn-primary text-light col-3 font-weight-bold'>
									{btnText}
								</button>
								<Link to='/forgotpassword' className='text-primary mt-1 font-weight-light'>
									Forgot Password
								</Link>
							</Form.Group>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
}
