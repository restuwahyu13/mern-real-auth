import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActivationAuth = ({ match }) => {
	const [values, setValues] = useState({
		message: '',
		active: false,
	});
	useEffect(() => {
		ActivationAccount();
	});

	const ActivationAccount = () => {
		axios
			.get(`/api/auth/activation/${match.params.token}`)
			.then((res) => setValues({ ...values, message: res.data.success, active: true }))
			.catch((err) => setValues({ ...values, message: err.response.data.error, active: false }));
	};

	return !values.active ? (
		<>
			<h4>{values.message}</h4>
		</>
	) : (
		<>
			<h4>{values.message}</h4>
		</>
	);
};

export default ActivationAuth;
