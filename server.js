require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const { resolve } = require('path');
const cluster = require('cluster');
const os = require('os');
const app = express();
const server = http.createServer(app);

// init route
const authRoute = require('./routes/auth.route');

// setup global promise
mongoose.Promise = global.Promise;

// setup database connection
mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: true,
		useCreateIndex: true,
	})
	.then(() => console.log('Database successfuly to connected'))
	.catch(() => console.log('Database failed to connected'));

// register all plugin middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression({ level: 9, strategy: 4 }));
app.use(cors({ origin: '*', methods: '*', allowedHeaders: '*', credentials: true }));

// if production mode execute this function
if (process.env.NODE_ENV) {
	app.use(express.static(resolve(process.cwd(), 'client/build')));
	app.get('*', (req, res) => {
		res.sendFile(resolve(process.cwd(), 'client/build/index.html'));
	});
}

// register route middleware
app.use('/api', authRoute);

/**
 @description  increase performance using cluster module
 @description use all core thread cpu because nodejs is run using single thread cpu
*/

if (cluster.isMaster) {
	let cpuCore = os.cpus().length;
	for (let i = 0; i < cpuCore; i++) {
		cluster.fork();
	}
	cluster.on('online', (worker) => {
		if (worker.isConnected()) console.log(`worker is active ${worker.process.pid}`);
	});
	cluster.on('exit', (worker) => {
		if (worker.isDead()) console.log(`worker is dead ${worker.process.pid}`);
		cluster.fork();
	});
} else {
	// listening server port
	server.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));
}
