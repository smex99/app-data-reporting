const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const config = require('../config/config');

module.exports = {
	// Output of Fosus
	invoiceReadingResult: async (req, res, next) => {
		MongoClient.connect(
			config.db.url,
			{ useNewUrlParser: true, useUnifiedTopology: true },
			(error, client) => {
				const db = client.db('konta_rma_2');
				const collection = db.collection(config.collection.focus.remote);

				collection.find({}).toArray((err, result) => {
					if (err) throw err;
					res.status(200).json(result);
					client.close();
				});
			}
		);
	},

	// Output of BB8
	bb8ReadingResult: async (req, res, next) => {
		MongoClient.connect(
			config.db.url,
			{ useNewUrlParser: true, useUnifiedTopology: true },
			(error, client) => {
				const db = client.db('konta_rma_2');
				const collection = db.collection(config.collection.bb8.remote);

				collection.find({}).toArray((err, result) => {
					if (err) throw err;
					res.status(200).json(result);
					client.close();
				});
			}
		);
	},

	// Invoice count per number of calsses predicted for Focus
	predictionMetrics: async (req, res, next) => {
		MongoClient.connect(
			config.db.url,
			{ useNewUrlParser: true, useUnifiedTopology: true },
			(error, client) => {
				const db = client.db('konta_rma_2');
				const collection = db.collection(config.collection.focus.remote);

				collection
					.aggregate([
						{
							$group: {
								_id: null,
								avg_nb_classes_predicted: {
									$avg: '$nb_classes_predicted'
								},
								max_nb_classes_predicted: {
									$max: '$nb_classes_predicted'
								},
								min_nb_classes_predicted: {
									$min: '$nb_classes_predicted'
								}
							}
						}
					])
					.toArray((err, result) => {
						if (err) throw err;
						res.status(200).json(result);
						client.close();
					});
			}
		);
	},

	// Performance metrics for Focus (Execution time)
	performanceMetrics: async (req, res, next) => {
		MongoClient.connect(
			config.db.url,
			{ useNewUrlParser: true, useUnifiedTopology: true },
			(error, client) => {
				const db = client.db('konta_rma_2');
				const collection = db.collection(config.collection.focus.remote);

				collection
					.aggregate([
						{
							$group: {
								_id: null,
								avg_time: { $avg: '$metrics.execution_time_in_ms' },
								max_time: { $max: '$metrics.execution_time_in_ms' },
								min_time: { $min: '$metrics.execution_time_in_ms' }
							}
						}
					])
					.toArray((err, result) => {
						if (err) throw err;
						res.status(200).json(result);
						client.close();
					});
			}
		);
	},

	// Performance metrics for BB8 (Execution time)
	bb8PerformanceMetrics: async (req, res, next) => {
		MongoClient.connect(
			config.db.url,
			{ useNewUrlParser: true, useUnifiedTopology: true },
			(error, client) => {
				const db = client.db('konta_rma_2');
				const collection = db.collection(config.collection.bb8.remote);

				collection
					.aggregate([
						{
							$group: {
								_id: null,
								avg_time: { $avg: '$metrics.execution_time_in_ms' },
								max_time: { $max: '$metrics.execution_time_in_ms' },
								min_time: { $min: '$metrics.execution_time_in_ms' }
							}
						}
					])
					.toArray((err, result) => {
						if (err) throw err;
						res.status(200).json(result);
						client.close();
					});
			}
		);
	},

	// Focus prediction metric by number of classes predicted
	readingClassCountPredicted: async (req, res, next) => {
		MongoClient.connect(
			config.db.url,
			{ useNewUrlParser: true, useUnifiedTopology: true },
			(error, client) => {
				const db = client.db('konta_rma_2');
				const collection = db.collection(config.collection.focus.remote);

				// Request to aggregate the predictions by number of class predicted
				collection.find({ prediction: {} }).toArray((err, result) => {
					if (err) throw err;
					res.status(200).json(result);
					client.close();
				});
			}
		);
	},

	// Get focus reading result for specific invoiceId
	getFocusReadingInvoiceById: async (req, res, next) => {
		const { id } = req.params;

		MongoClient.connect(
			config.db.url,
			{ useNewUrlParser: true, useUnifiedTopology: true },
			(error, client) => {
				const db = client.db('konta_rma_2');
				const collection = db.collection(config.collection.focus.remote);

				collection.find({ invoice_id: id }).toArray((err, result) => {
					if (err) throw err;
					res.status(200).json(result);
					client.close();
				});
			}
		);
	},

	// Get bb8 reading result for specific invoiceId
	getBB8ReadingResultById: async (req, res, next) => {
		const { id } = req.params;

		MongoClient.connect(
			config.db.url,
			{ useNewUrlParser: true, useUnifiedTopology: true },
			(error, client) => {
				const db = client.db('konta_rma_2');
				const collection = db.collection(config.collection.bb8.remote);

				collection.find({ invoice_id: id }).toArray((err, result) => {
					if (err) throw err;
					res.status(200).json(result);
					client.close();
				});
			}
		);
	},

	getBB8ReadingResultByNumberClasses: async (req, res, next) => {
		const { number } = req.params;

		MongoClient.connect(
			config.db.url,
			{ useNewUrlParser: true, useUnifiedTopology: true },
			(error, client) => {
				const db = client.db('konta_rma_2');
				const collection = db.collection(config.collection.bb8.remote);

				collection
					.aggregate({
						$project: { classesCount: { $size: '$predictions' } }
					})
					.toArray((err, result) => {
						if (err) throw err;
						res.status(200).json(result);
						client.close();
					});
			}
		);
	},

	// Get the filename for a invoiceId
	getfilenameByInvoiceId: async (req, res, next) => {
		const { id } = req.params;

		MongoClient.connect(
			config.db.url,
			{ useNewUrlParser: true, useUnifiedTopology: true },
			(error, client) => {
				const db = client.db('konta_rma_2');
				const collection = db.collection(config.collection.invoice.remote);

				collection
					.find({ _id: new mongodb.ObjectID(id) })
					.toArray((err, result) => {
						if (err) throw err;
						// const filename = result.originalFilename;
						res.status(200).json(result);
						client.close();
					});
			}
		);
	},

	getInvoiceImage: async (req, res, next) => {
		// Get the filename from the request params
		// const { filename } = req.params;

		// TODO: read the corresponding invoice image to the filename from file system.
		/* fs.readFile('../public/invoice.png', (err, data) => {
			if (err) throw err;
			res.writeHead(200, { 'Content-Type': 'image/png' });
			res.write(data);
			res.end(data);
		}); */

		// res.sendFile('../public/invoice.png');
		console.log('reading image from file system');

		// res.attachment('../public/invoice.png');
	}
};
