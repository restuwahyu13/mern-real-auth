const userSchema = require('../models/auth.model');
const jwt = require('jsonwebtoken');
const { templateMailRegister } = require('../helpers/templateMailRegister');
const { templateMailReset } = require('../helpers/templateMailReset');
const sendGridEmail = require('@sendgrid/mail');
sendGridEmail.setApiKey(process.env.SG_API_KEY);

exports.authController = {
	/**
	 * @method POST
	 * @description this function for handle register new user account
	 */
	registerAccount: async (req, res) => {
		const { username, email, password, role } = req.body;
		const hashPassword = await userSchema.hash(password);

		const findUser = await userSchema.findOne({ username: username }).lean();
		if (findUser) res.status(409).json({ error: 'Oops..User account already exist' });

		const userBody = new userSchema({
			username: username,
			email: email,
			password: hashPassword,
			role: role,
			created_at: Date.now(),
		});

		const savingData = await userBody.save();
		if (!savingData) res.status(200).json({ error: 'Oops..registered account failed' });

		const token = jwt.sign({ id: savingData._id }, process.env.JWT_SECRET, { expiresIn: '5m' });
		const message = templateMailRegister(username, email, token);
		sendGridEmail.send(message);

		res.status(201).json({ success: 'Yeah..registered account successfuly' });
	},
	/**
	 * @method POST
	 * @description this function for handle login user to homepage after register
	 */
	loginAccount: async (req, res) => {
		const findUser = await userSchema.findOne({ username: req.body.username }).lean();
		if (!findUser) res.status(404).json({ error: 'Oops..User account not found, Please register' });

		if (!findUser.activation_account) res.status(403).json({ error: 'Oops..Account is not active, Please check your email activation' });

		const verifyPassword = userSchema.verify(req.body.password, findUser.password);
		if (!verifyPassword) res.status(400).json({ error: `Oops..password don't match` });

		const { _id, username } = findUser;
		const token = jwt.sign({ _id, username }, process.env.JWT_SECRET, { expiresIn: '5m' });
		res.status(200).json({ success: 'Yeah..Login Successfully', accessToken: token });
	},
	/**
	 * @method GET
	 * @description this function for handle activation user account after register
	 */
	activationAccount: async (req, res) => {
		const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
		if (!decoded) res.status(401).json({ error: 'Oops..Token expired, Please try again' });

		const findUser = await userSchema.findById(decoded.id);
		if (!findUser) res.status(404).json({ error: 'Oops..User account not found, Please register' });

		await userSchema.findByIdAndUpdate(findUser._id, { $set: { activation_account: true } });
		res.status(200).json({ success: 'Yeah..Account hash been active, Please login' });
	},
	/**
	 * @method POST
	 * @description this function for handle reset password or resend activation account, if account is not active
	 */
	forgotPassword: async (req, res) => {
		const findUser = await userSchema.findOne({ email: req.body.email }).lean();
		if (!findUser) res.status(404).json({ error: 'Oops..User account is not registered' });

		let message;
		const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, { expiresIn: '5m' });

		if (!findUser.activation_account) message = templateMailRegister(findUser.username, findUser.email, token);
		else message = templateMailReset(findUser.username, findUser.email, token);

		const sendMail = await sendGridEmail.send(message);
		if (sendMail[0].statusCode === 202) res.status(200).json({ success: 'Yeah..Reset password succesfuly, Please check your email' });
	},
	/**
	 * @method PUT
	 * @description this function for handle change old password to new password
	 */
	resetPassword: async (req, res) => {
		const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
		if (!decoded) res.status(401).json({ error: 'Oops..Token expired, Please try again' });

		const findUser = await userSchema.findById(decoded.id).lean();
		const verifyPassword = userSchema.verify(req.body.oldpass, findUser.password);

		if (!verifyPassword) res.status(401).json({ error: `Oops..Old password don't match` });
		const hashPassword = userSchema.hash(req.body.newpass);

		const changePassword = await userSchema.findByIdAndUpdate(findUser._id, { $set: { password: hashPassword } });
		res.status(200).json({ success: 'Yeah..Change password successfuly, Please sign' });
	},
};
