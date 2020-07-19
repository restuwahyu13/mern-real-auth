import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Form } from 'react-bootstrap';

const ResetPasswordAuth = ({ match, history }) => {
	const [values, setValues] = useState({
		oldpass: '',
		newpass: '',
		disable: false,
		pointer: '',
		btnText: 'Change Password',
	});
	const { token } = useParams(match);
	const { oldpass, newpass, disable, pointer, btnText } = values;

	const onSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, disable: true, pointer: 'not-allowed', btnText: 'Change Password...' });

		setTimeout(async () => {
			setValues({ ...values, oldpass: '', newpass: '', disable: false, pointer: '', btnText: 'Change Password' });
			axios
				.put(`/api/auth/resetpassword/${token}`, { oldpass, newpass })
				.then((res) => history.push('/signin'))
				.catch((err) => alert(err.response.data.error));
		}, 2000);
	};

	return (
		<>
			<Container className='mt-4'>
				<Row className='justify-content-center'>
					<Col lg='6' md='6' sm='12'>
						<div class='lead text-center mt-1 p-3'>
							<span style={{ fontSize: '20px', fontWeight: 400 }}>Change your old password ?</span>
						</div>
						<Form onSubmit={onSubmit}>
							<Form.Group>
								<Form.Label className='text-dark font-weight-bold'>Old Password</Form.Label>
								<Form.Control
									type='password'
									name='oldpass'
									placeholder='Enter Old Password'
									value={oldpass}
									onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label className='text-dark font-weight-bold'>New Password</Form.Label>
								<Form.Control
									type='password'
									name='newpass'
									placeholder='Enter New Password'
									value={newpass}
									onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
								/>
							</Form.Group>
							<Form.Group>
								<button disabled={disable} style={{ cursor: `${pointer}` }} className='btn btn-primary mt-1 font-weight-bold'>
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

export default ResetPasswordAuth;
