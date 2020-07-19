import React from 'react';
import { Container, Row, Col, Jumbotron } from 'react-bootstrap';

export default function Home() {
	return (
		<>
			<Container className='mt-5'>
				<Row>
					<Col>
						<Jumbotron className='bg-dark'>
							<h4 className='text-light font-weight-light'>MERN FullStack Real Wordl Authentication</h4>
							<code className='lead text-light font-weight-light'>mini project implementation </code>
							<button type='button' className='btn btn-primary'>
								<a href='https://tinyurl.com/y4tfoaty' target='_blank' className='text-light text-decoration-none'>
									More Tutorial
								</a>
							</button>
						</Jumbotron>
					</Col>
				</Row>
			</Container>
		</>
	);
}
