const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config/config');
const path = require('path');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/bb8', require('./routes/bb8'));
app.use('/api/focus', require('./routes/focus'));
app.use('/api/report', require('./routes/report'));

app.get('/image/:id', (req, res) => {
	const { filename } = req.params;

	var options = {
		root: path.join(__dirname, 'public'),
		dotfiles: 'deny',
		headers: {
			'x-timestamp': Date.now(),
			'x-sent': true
		}
	};

	res.sendFile(`${filename}`, options, error => {
		if (error) {
			next(error);
		} else {
			console.log('Sent:', fileName);
		}
	});

	// res.sendFile(`/home/lake/Documents/rma_all_invoice/${filename}.jpeg`);
});

// Run the app on port 5000
app.listen(config.port);
console.log(`app running on port ${config.port}`);
