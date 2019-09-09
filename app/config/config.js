module.exports = {
	port: process.env.PORT || 5000,
	db: {
		url: 'mongodb://192.168.1.128:27017/konta_rma_2', // remote Mongodb server
		local: 'mongodb://localhost:27017/konta_rma_2'
	}
};
