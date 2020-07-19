import React from 'react';
import { removeAuthToken } from '../auth/AuthToken';
import { withRouter, Link } from 'react-router-dom';

const LogoutAccount = ({ history }) => {
	return (
		<Link to='/signin' onClick={() => removeAuthToken(() => history.push('/signin'))} style={{ color: '#f7f7f7' }}>
			Logout
		</Link>
	);
};
export default withRouter(LogoutAccount);
