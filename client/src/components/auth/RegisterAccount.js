import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form } from 'react-bootstrap';

const RegisterAuth = () => {
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		disable: false,
		pointer: '',
		btnText: 'Sign-up',
	});
	const { username, email, password, disable, pointer, btnText } = values;

	const onSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, disable: true, pointer: 'not-allowed', btnText: 'Sign-up...' });

		setTimeout(() => {
			setValues({ ...values, disable: false, pointer: '', btnText: 'Sign-up' });
			axios
				.post('/api/auth/signup', { username, email, password })
				.then((res) => alert(res.data.success))
				.catch((err) => alert(err.data.response.error));
		}, 2000);
	};

	return (
		<>
			<Container className='mt-3'>
				<Row className='justify-content-center'>
					<Col lg='6' md='6' sm='12'>
						<div class='lead text-center mt-1 p-3'>
							<span style={{ fontSize: '24px', fontWeight: 400 }}>Form Sign-up</span>
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
								<Form.Label className='text-dark font-weight-bold'>Email</Form.Label>
								<Form.Control
									type='email'
									name='email'
									placeholder='Enter Email'
									value={email}
									onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label className='font-weight-bold'>Password</Form.Label>
								<Form.Control
									type='password'
									name='password'
									placeholder='Enter Password'
									value={password}
									onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
								/>
							</Form.Group>
							<Form.Group>
								<button
									disabled={disable}
									style={{ cursor: `${pointer}` }}
									className='btn btn-primary text-light col-3 mt-1 font-weight-bold'
								>
									{btnText}
								</button>
							</Form.Group>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default RegisterAuth;
