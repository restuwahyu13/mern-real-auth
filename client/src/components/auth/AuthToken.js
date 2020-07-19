import cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

// set authenticate
export const authToken = ({ accessToken }, callback) => {
	const decoded = jwt.decode(accessToken);
	cookie.set('token_auth', accessToken, { expires: 24 * 60 * 60 * 7, sameSite: 'strict' });
	localStorage.setItem('user_auth', decoded.username);
	callback();
};

// get authenticate
export const isAuthToken = () => {
	if (!localStorage.getItem('user_auth') && !cookie.get('token_auth')) return false;
	return localStorage.getItem('user_auth');
};

// remove authenticate
export const removeAuthToken = (callback) => {
	cookie.remove('token_auth', { expires: 24 * 60 * 60 * 7, sameSite: 'strict' });
	localStorage.removeItem('user_auth');
	callback();
};
