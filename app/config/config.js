module.exports = {
	port: process.env.PORT || 5000,
	storage: {
		bucket: '/home/lake/Documents/rma_all_invoice/'
	},
	db: {
		url: 'mongodb://192.168.1.128:27017/konta_rma_2',
		local: 'mongodb://localhost:27017/konta_rma_2'
	},

	collection: {
		bb8: {
			remote: 'BB8_prediction_results',
			local: 'bb8ReadingResult'
		},
		focus: {
			remote: 'invoiceReadingResult_MAR_2',
			local: 'invoiceReadingResult'
		},
		invoice: {
			remote: 'invoice'
		}
	}
};
