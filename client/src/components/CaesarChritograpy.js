import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

export default function CaesarChritograpy() {
	const [values, setValues] = useState({
		name: '',
		num: '',
		result: '',
	});
	const { name, num, result } = values;

	const caesarChritograpy = (s, n) => {
		let alphabet = 'abcdefghijklmnopqrstuvwxyz';
		let uc = alphabet.replace(/\s/g, '').toUpperCase().split('');
		let lc = alphabet.replace(/\s/g, '').toLowerCase().split('');

		return Array.from(s)
			.map((v) => (uc.indexOf(v) !== -1 ? uc[uc.indexOf(v) + (n % 26)] : lc[lc.indexOf(v) + (n % 26)]))
			.join('');
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setValues({ ...values, num: '', result: caesarChritograpy(name, num) });
	};

	const onClick = () => {
		setValues({ ...values, name: '', num: '', result: '' });
	};

	return (
		<>
			<Container className='mt-4'>
				<Row className='justify-content-center'>
					<Col lg='6' md='6' sm='12'>
						<div className='lead text-center  p-1'>
							<span style={{ fontSize: '19px' }}>
								<span className='font-weight-bold'>Original Name: </span>
								<span style={{ fontWeight: 500 }}>{name}</span>
							</span>
						</div>
						<div className='lead text-center p-1'>
							<span style={{ fontSize: '19px' }}>
								<span className='font-weight-bold'>Caesar Chritograpy Name: </span>
								<span style={{ fontWeight: 500 }}>{result}</span>
							</span>
						</div>
						<Form onSubmit={onSubmit}>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type='text'
									name='name'
									value={name}
									placeholder='Enter Name'
									onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
								/>
							</Form.Group>
							<Form.Group>
								<Form.Label>Number</Form.Label>
								<Form.Control
									type='number'
									name='num'
									placeholder='Enter Number'
									value={num}
									onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
								/>
							</Form.Group>
							<Form.Group className='d-flex justify-content-between'>
								<button className='btn btn-primary mt-1'>Generate Name</button>
								<button className='btn btn-danger mt-1' onClick={onClick}>
									Reset Name
								</button>
							</Form.Group>
						</Form>
					</Col>
				</Row>
			</Container>
		</>
	);
}
