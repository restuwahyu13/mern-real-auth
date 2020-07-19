import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form } from 'react-bootstrap';

const ForgotPasswordAuth = () => {
	const [values, setValues] = useState({
		email: '',
		disable: false,
		pointer: '',
		btnText: 'Reset Password',
	});

	const { email, disable, pointer, btnText } = values;

	const onSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, disable: true, pointer: 'not-allowed', btnText: 'Reset Password...' });

		setTimeout(() => {
			setValues({ ...values, email: '', disable: false, pointer: '', btnText: 'Reset Password' });
			axios
				.post('/api/auth/forgotpassword', { email })
				.then((res) => alert(res.data.success))
				.catch((err) => alert(err.response.data.error));
		}, 2000);
	};

	return (
		<>
			<Container className='mt-4'>
				<Row className='justify-content-center'>
					<Col lg='6' md='6' sm='12'>
						<div className='lead text-center mt-1 p-3'>
							<span style={{ fontSize: '19px', fontWeight: 400 }}>Are you sure you want to reset your password ?</span>
						</div>
						<Form onSubmit={onSubmit}>
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
								<button disabled={disable} style={{ cursor: `${pointer}` }} className='btn btn-primary text-light font-weight-bold'>
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

export default ForgotPasswordAuth;
